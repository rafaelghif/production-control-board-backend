import { addHours, format, startOfHour } from "date-fns";
import { QueryTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";
import { errorLogging } from "../helpers/error.js";

export const getDataFromAllLines = async (req, res) => {
	try {
		const { date } = req.params;

		const currentDate = new Date();
		const startTime = "06:30:00";
		const endTime = format(
			addHours(startOfHour(currentDate), -1),
			"HH:mm:ss",
		);
		const strCurrDate = format(currentDate, "yyyy-MM-dd");
		const startDate = `${date} ${startTime}`;
		const endDate = `${date} ${format(startOfHour(currentDate), "HH:mm:ss")}`;

		const orderCompleteQuery = `
        WITH
            CTE_PLAN_PASS AS (
                SELECT
                    CBP.id,
                    CBP.LineId,
                    SUM(CBPD.qty) as qty
                FROM
                    controlboardplannings as CBP
                    JOIN controlboardplanningdetails as CBPD ON CBP.id = CBPD.ControlBoardPlanningId
                WHERE
                    CBP.date = '${strCurrDate}'
                    AND CBPD.time BETWEEN '${startTime}' AND '${endTime}'
                GROUP BY
                    CBP.id,
                    CBP.LineId
            ),
            CTE_PLAN_CURR AS (
                SELECT
                    CBP.id,
                    CBP.LineId,
                    SUM(CBPD.qty) as qty
                FROM
                    controlboardplannings as CBP
                    JOIN controlboardplanningdetails as CBPD ON CBP.id = CBPD.ControlBoardPlanningId
                WHERE
                    CBP.date = '${strCurrDate}'
                GROUP BY
                    CBP.id,
                    CBP.LineId
            ),
            CTE_PLAN_CURR_PASS AS (
                SELECT
                    CPC.id,
                    CPC.LineId,
                    CPP.qty AS qtyPass,
                    CPC.qty AS qtyCurr
                FROM
                    CTE_PLAN_PASS AS CPP
                    RIGHT JOIN CTE_PLAN_CURR AS CPC ON CPP.id = CPC.id
            ),
            CTE_ORDER_CURR AS (
                SELECT 
                    LineId,
                    COUNT(LineId) AS qty
                FROM 
                (
                    SELECT * FROM ordercompletes WHERE createdAt >= '${startDate}'
                    UNION
                    SELECT * FROM ordercompletenodes WHERE createdAt >= '${startDate}'
                    UNION
                    SELECT * FROM ordercompletecables WHERE createdAt >= '${startDate}'
                ) AS T_CURR_ORDER
                GROUP BY
                    LineId
            ),
            CTE_ORDER_PASS AS (
                SELECT 
                    LineId,
                    COUNT(LineId) AS qty
                FROM 
                (
                    SELECT * FROM ordercompletes WHERE createdAt >= '${startDate}' AND createdAt <= '${endDate}'
                    UNION
                    SELECT * FROM ordercompletenodes WHERE createdAt >= '${startDate}' AND createdAt <= '${endDate}'
                    UNION
                    SELECT * FROM ordercompletecables WHERE createdAt >= '${startDate}' AND createdAt <= '${endDate}'
                ) AS T_PASS_ORDER
                GROUP BY
                    LineId
            )
        SELECT
            l.name as lineName,
            CPCP.qtyCurr as plantCurrQty,
            CPCP.qtyPass as plantPassQty,
            COC.qty as currentQty,
            COP.qty as passQty
        FROM
            v_active_line AS L
        LEFT JOIN
            CTE_PLAN_CURR_PASS  AS CPCP ON L.id = CPCP.LineId
        LEFT JOIN
            CTE_ORDER_CURR AS COC ON L.id = COC.LineId
        LEFT JOIN
            CTE_ORDER_PASS AS COP ON L.id = COP.LineId
        ORDER BY 
            l.abbreviation,
            l.sequence`;

		const orderCompletes = await connectionDatabase.query(
			orderCompleteQuery,
			{
				type: QueryTypes.SELECT,
				logging: console.log,
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
