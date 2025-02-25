import { format, startOfHour } from "date-fns";
import { QueryTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";
import { errorLogging } from "../helpers/error.js";

export const getDataFromAllLines = async (req, res) => {
	try {
		const { date } = req.params;

		const currentDate = new Date();
		const startTime = "06:00:00";
		const endTime = format(startOfHour(currentDate), "HH:mm:ss");
		const startDate = `${date} ${startTime}`;

		const controlBoardPlanningSubQuery = `
            (
                SELECT 
                    cbp.LineId, SUM(cbpd.qty) as totalQty 
                FROM 
                    controlboardplannings as cbp 
                JOIN 
                    (
                        SELECT * FROM controlboardplanningdetails 
                        WHERE controlboardplanningdetails.time BETWEEN '${startTime}' AND '${endTime}' 
                        ORDER BY ControlBoardPlanningId,sequence ASC 
                    ) as cbpd ON cbp.id = cbpd.ControlBoardPlanningId
                WHERE 
                    cbp.date = '${date}' 
                GROUP BY 
                    cbp.LineId
            ) as cbpd`;

		const orderCompleteSubQuery = `(
                SELECT * FROM ordercompletes WHERE createdAt >= '${startDate}'
                UNION
                SELECT * FROM ordercompletenodes WHERE createdAt >= '${startDate}'
                UNION
                SELECT * FROM ordercompletecables WHERE createdAt >= '${date}'
            ) as oca`;

		const orderCompleteQuery = `SELECT
                l.id,
                l.name as lineName,
                IF(cbpd.totalQty IS NULL,0,cbpd.totalQty) as totalPlanningQty,
                IF(oca.LineId IS NULL, 0, COUNT(*)) as totalOrderComplete
            FROM 
                ${orderCompleteSubQuery}
            RIGHT JOIN
                v_active_line as l on oca.LineId = l.id
            LEFT JOIN
                ${controlBoardPlanningSubQuery} ON l.id = cbpd.LineId
            GROUP BY
                l.id, 
                l.name,
                cbpd.totalQty
            ORDER BY
                l.name
            ASC;`;

		const orderCompletes = await connectionDatabase.query(
			orderCompleteQuery,
			{
				type: QueryTypes.SELECT,
			},
		);

		return res.status(200).json({
			message: "Success Fetch Control Board!",
			data: orderCompletes,
		});
	} catch (err) {
		errorLogging(err.toString());
		return res.status(500).json({
			isExpressValidation: false,
			data: {
				title: "Something Wrong!",
				message: err.toString(),
			},
		});
	}
};
