import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import connectionDatabase from "../configs/database.js";
import { Op, QueryTypes } from "sequelize";
import { addDay } from "../libs/date-fns.js";

const getQueryControlBoard = (lineId, date) => {
    const tomorrowDate = addDay(date, 1);

    const query = `
    WITH plannings AS (
        SELECT
            LineId,
            planningDate,
            planningTime,
            sequence,
            qty,
            SUM(qty) OVER(ORDER BY sequence) AS qtyCum,
            remark
        FROM
            v_controlboardplannings
        WHERE
            planningDate = '${date}' AND lineId = '${lineId}'
        ORDER BY
            sequence
    ),
    orders AS (
        SELECT
            LineId,
            createdDate,
            createdTime,
            total
        FROM
            v_ordercompletes
        WHERE
            (
                (createdDate = '${date}' AND createdTime BETWEEN 7 AND 23)
                OR 
                (createdDate = '${tomorrowDate}' AND createdTime BETWEEN 0 AND 6)
            ) 
            AND lineId = '${lineId}'
        ORDER BY
            createdDate,
            createdTime ASC
    )
    SELECT
        plannings.LineId,
        plannings.planningDate,
        plannings.planningTime,
        plannings.sequence AS planningSequence,
        plannings.qty AS planningQty,
        plannings.qtyCum AS planningQtyCumulative,
        IF(orders.total IS NULL, 0, orders.total) AS totalOrderComplete,
        SUM(IF(orders.total IS NULL, 0, orders.total)) OVER (ORDER BY plannings.sequence) AS totalOrderCompleteCumulative,
        (SUM(IF(orders.total IS NULL, 0, orders.total)) OVER (ORDER BY plannings.sequence) - plannings.qtyCum) AS differenceQty,
        plannings.remark
    FROM
        plannings
    LEFT JOIN
        orders ON plannings.planningTime = orders.createdTime
    ORDER BY
        plannings.sequence ASC;`;

    return query;
}

export const getControlBoards = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                isExpressValidation: true,
                data: {
                    title: "Validation Errors!",
                    message: "Validation Error!",
                    validationError: errors.array()
                }
            });
        }

        const { lineId, date } = req.params;

        const data = [];

        if (lineId === "none") {
            return res.status(200).json({
                message: "Success Fetch Control Board!",
                data: []
            });
        }

        if (lineId !== "All") {
            const line = await models.Line.findByPk(lineId);

            if (!line) {
                return res.status(400).json({
                    isExpressValidation: false,
                    data: {
                        title: "Error!",
                        message: "Line not found! Please contact engineering!",
                        validationError: errors.array()
                    }
                });
            }

            const lineName = line.name;
            const response = await connectionDatabase.query(getQueryControlBoard(lineId, date), { type: QueryTypes.SELECT, logging: false });

            const responseSetting = await models.ControlBoardPlanning.findOne({
                where: {
                    LineId: lineId
                }
            });

            data.push({
                lineName,
                plannings: response,
                settings: responseSetting
            });
        } else {
            const lines = await models.Line.findAll({
                order: [["name", "ASC"]],
                where: {
                    inActive: false
                }
            });

            for (const line of lines) {
                const lineName = line.name;
                const response = await connectionDatabase.query(getQueryControlBoard(line.id, date), { type: QueryTypes.SELECT, logging: false });
                const responseSetting = await models.ControlBoardPlanning.findOne({
                    where: {
                        LineId: line.id
                    }
                });
                data.push({
                    lineName,
                    plannings: response,
                    settings: responseSetting
                });
            }
        }
        return res.status(200).json({
            message: "Success Fetch Control Board!",
            data: data.filter((res) => res.plannings.length > 0)
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(500).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const getRemarkByLineAndDate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                isExpressValidation: true,
                data: {
                    title: "Validation Errors!",
                    message: "Validation Error!",
                    validationError: errors.array()
                }
            });
        }

        const { lineId, date } = req.params;

        const response = await models.ControlBoardPlanningDetail.findAll({
            order: [["sequence", "ASC"]],
            where: {
                remark: { [Op.ne]: null },
            },
            include: [{
                model: models.ControlBoardPlanning,
                attributes: [],
                where: {
                    LineId: lineId,
                    date: date
                }
            }]
        });

        return res.status(200).json({
            message: "Success Fetch Control Board Remark!",
            data: response
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(500).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}