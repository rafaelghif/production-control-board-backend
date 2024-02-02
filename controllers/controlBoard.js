import { format } from "date-fns";
import { validationResult } from "express-validator";
import { Op, QueryTypes } from "sequelize";

import connectionDatabase, {
	connectionDatabaseSql,
} from "../configs/database.js";
import { errorLogging } from "../helpers/error.js";
import { addDay } from "../libs/date-fns.js";
import models from "../models/index.js";

const getQueryControlBoard = (lineId, date, shift = null) => {
	const tomorrowDate = addDay(date, 1);

	const lineIndex = ["2927e6f4-408d-4c70-be68-f2145d307dcc"];

	let view = lineIndex.includes(lineId)
		? "v_ordercompletes_cable"
		: "v_ordercompletes";

	let whereDate = `
        (
            (createdDate = '${date}' AND createdTime BETWEEN 7 AND 23)
            OR
            (createdDate = '${tomorrowDate}' AND createdTime BETWEEN 0 AND 6)
        )
    `;

	if (shift && shift === "Short") {
		whereDate = `
        (
            (createdDate = '${date}' AND createdTime BETWEEN 6 AND 23)
            OR
            (createdDate = '${tomorrowDate}' AND createdTime BETWEEN 0 AND 5)
        )
        `;

		view = lineIndex.includes(lineId)
			? "v_ordercompletes_half_total_cable"
			: "v_ordercompletes_half_total";
	}

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
            ${view}
        WHERE ${whereDate}
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
};

export const getControlBoards = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				isExpressValidation: true,
				data: {
					title: "Validation Errors!",
					message: "Validation Error!",
					validationError: errors.array(),
				},
			});
		}

		const { lineId, date } = req.params;

		const data = [];

		if (lineId === "none") {
			return res.status(200).json({
				message: "Success Fetch Control Board!",
				data: [],
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
						validationError: errors.array(),
					},
				});
			}

			const lineName = line.name;
			const response = await connectionDatabase.query(
				getQueryControlBoard(lineId, date),
				{ type: QueryTypes.SELECT, logging: false },
			);

			const responseSetting = await models.ControlBoardPlanning.findOne({
				where: {
					LineId: lineId,
					date,
				},
			});

			data.push({
				lineName,
				plannings: response,
				settings: responseSetting,
			});
		} else {
			const lines = await models.Line.findAll({
				order: [["name", "ASC"]],
				where: {
					inActive: false,
				},
			});

			for (const line of lines) {
				const lineName = line.name;
				const response = await connectionDatabase.query(
					getQueryControlBoard(line.id, date),
					{ type: QueryTypes.SELECT, logging: false },
				);
				const responseSetting =
					await models.ControlBoardPlanning.findOne({
						where: {
							LineId: line.id,
							date,
						},
					});
				data.push({
					lineName,
					plannings: response,
					settings: responseSetting,
				});
			}
		}
		return res.status(200).json({
			message: "Success Fetch Control Board!",
			data: data.filter((res) => res.plannings.length > 0),
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

export const getControlBoardsShift = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				isExpressValidation: true,
				data: {
					title: "Validation Errors!",
					message: "Validation Error!",
					validationError: errors.array(),
				},
			});
		}

		const { lineId, date, shift } = req.params;

		const data = [];

		if (lineId === "none") {
			return res.status(200).json({
				message: "Success Fetch Control Board!",
				data: [],
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
						validationError: errors.array(),
					},
				});
			}

			const lineName = line.name;
			let response = await connectionDatabase.query(
				getQueryControlBoard(lineId, date, shift),
				{ type: QueryTypes.SELECT, logging: false },
			);

			const currentTime = +format(new Date(), "H");
			// const currentTime = 23;

			if (shift === "Long") {
				if (currentTime >= 7 && currentTime <= 17) {
					response = response.filter(
						(res) =>
							res.planningTime >= 7 && res.planningTime <= 18,
					);
				} else {
					response = response.filter(
						(res) =>
							(res.planningTime >= 0 && res.planningTime <= 6) ||
							(res.planningTime >= 18 && res.planningTime <= 23),
					);
				}
			} else if (shift === "Short") {
				if (currentTime >= 6 && currentTime <= 14) {
					response = response.filter(
						(res) => res.planningTime >= 6 && res.planningTime < 15,
					);
				} else if (currentTime >= 14 && currentTime <= 21) {
					response = response.filter(
						(res) =>
							res.planningTime >= 14 && res.planningTime < 22,
					);
				} else if (
					(currentTime >= 21 && currentTime <= 23) ||
					(currentTime >= 0 && currentTime <= 5)
				) {
					response = response.filter(
						(res) =>
							(res.planningTime >= 21 &&
								res.planningTime <= 23) ||
							(res.planningTime >= 0 && res.planningTime <= 5),
					);
				}
			}

			const responseSetting = await models.ControlBoardPlanning.findOne({
				where: {
					LineId: lineId,
					date,
				},
			});

			data.push({
				lineName,
				plannings: response,
				settings: responseSetting,
				shift: shift,
			});
		} else {
			const lines = await models.Line.findAll({
				order: [["name", "ASC"]],
				where: {
					inActive: false,
				},
			});

			for (const line of lines) {
				const lineName = line.name;
				const response = await connectionDatabase.query(
					getQueryControlBoard(line.id, date),
					{ type: QueryTypes.SELECT, logging: false },
				);
				const responseSetting =
					await models.ControlBoardPlanning.findOne({
						where: {
							LineId: line.id,
							date,
						},
					});
				data.push({
					lineName,
					plannings: response,
					settings: responseSetting,
				});
			}
		}
		return res.status(200).json({
			message: "Success Fetch Control Board!",
			data: data.filter((res) => res.plannings.length > 0),
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

export const getRemarkByLineAndDate = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				isExpressValidation: true,
				data: {
					title: "Validation Errors!",
					message: "Validation Error!",
					validationError: errors.array(),
				},
			});
		}

		const { lineId, date } = req.params;

		const response = await models.ControlBoardPlanningDetail.findAll({
			order: [["sequence", "ASC"]],
			where: {
				remark: { [Op.ne]: null },
			},
			include: [
				{
					model: models.ControlBoardPlanning,
					attributes: [],
					where: {
						LineId: lineId,
						date: date,
					},
				},
			],
		});

		return res.status(200).json({
			message: "Success Fetch Control Board Remark!",
			data: response,
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

export const getPtrPerLine = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				isExpressValidation: true,
				data: {
					title: "Validation Errors!",
					message: "Validation Error!",
					validationError: errors.array(),
				},
			});
		}

		const { lineId, month, year } = req.params;

		const lineIndex = ["2927e6f4-408d-4c70-be68-f2145d307dcc"];

		const viewName = lineIndex.includes(lineId) ? "v_ptr_cable" : "v_ptr";
		const query = `SELECT * FROM ${viewName} WHERE createdMonth = '${month}' AND createdYear = '${year}' AND LineId = '${lineId}' ORDER BY model ASC`;

		const response = await connectionDatabase.query(query, {
			type: QueryTypes.SELECT,
		});

		return res.status(200).json({
			message: "Success Fetch PTR PerLine!",
			data: response,
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

export const getPtrPerLineSql = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				isExpressValidation: true,
				data: {
					title: "Validation Errors!",
					message: "Validation Error!",
					validationError: errors.array(),
				},
			});
		}

		const { lineId, month, year } = req.params;

		const viewName = "[dbpp].[dbo].[v_ptr_control_board]";
		const query = `SELECT * FROM ${viewName} WHERE createdMonth = '${month}' AND createdYear = '${year}' AND YMBLine = '${lineId.replace("-", "/")}' ORDER BY model ASC`;
		console.log(query);

		const response = await connectionDatabaseSql.query(query, {
			type: QueryTypes.SELECT,
		});

		return res.status(200).json({
			message: "Success Fetch PTR PerLine!",
			data: response,
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
