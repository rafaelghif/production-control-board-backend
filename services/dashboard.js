import { addDays, format } from "date-fns";
import { QueryTypes } from "sequelize";

import connectionDatabase from "../configs/database.js";

export const getLineShiftType = async () => {
	const currentDate = new Date();
	const previousDay = addDays(currentDate, -1);
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const currentHour = new Date().getHours();

	let date = strCurrDate;

	if (currentHour >= 0 && currentHour <= 6) {
		date = strPreviousDate;
	}

	const sql =
		"SELECT l.id as lineId,l.abbreviation,l.sequence,l.name,cbp.shift FROM `v_active_line` as l LEFT JOIN controlboardplannings as cbp ON l.id = cbp.LineId AND cbp.date = :date ORDER BY l.abbreviation,l.sequence ASC";

	const response = await connectionDatabase.query(sql, {
		type: QueryTypes.SELECT,
		replacements: {
			date: date,
		},
		logging: false,
	});

	return response;
};

export const getPlanningQtyByLineId = async (lineId) => {
	const currentDate = new Date();
	const previousDay = addDays(currentDate, -1);
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const currentHour = new Date().getHours();

	let date = strCurrDate;
	if (currentHour >= 0 && currentHour <= 6) {
		date = strPreviousDate;
	}

	const sql = `
	SELECT
		CBP.id,
		CBP.LineId,
		SUM(CBPD.qty) as qty
	FROM
		controlboardplannings as CBP
		JOIN controlboardplanningdetails as CBPD ON CBP.id = CBPD.ControlBoardPlanningId
	WHERE
		CBP.date = :date AND CBP.LineId = :lineId
	GROUP BY
		CBP.id,
		CBP.LineId`;
	const response = await connectionDatabase.query(sql, {
		type: QueryTypes.SELECT,
		replacements: {
			date,
			lineId,
		},
		logging: false,
	});

	if (response.length > 0) {
		return response[0].qty;
	}

	return 0;
};

export const getCurrentQtyByLineId = async (lineId) => {
	const currentDate = new Date();
	const previousDay = addDays(currentDate, -1);
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const currentHour = new Date().getHours();

	let date = strCurrDate;
	if (currentHour >= 0 && currentHour <= 6) {
		date = strPreviousDate;
	}

	const sql = `
	SELECT 
		LineId,
		COUNT(LineId) AS qty
	FROM 
	(
		SELECT * FROM ordercompletes WHERE createdAt >= :date AND LineId = :lineId
		UNION
		SELECT * FROM ordercompletenodes WHERE createdAt >= :date AND LineId = :lineId
		UNION
		SELECT * FROM ordercompletecables WHERE createdAt >= :date AND LineId = :lineId
	) AS T_CURR_ORDER
	GROUP BY
		LineId`;
	const response = await connectionDatabase.query(sql, {
		type: QueryTypes.SELECT,
		replacements: {
			date,
			lineId,
		},
		logging: false,
	});

	if (response.length > 0) {
		return response[0].qty;
	}

	return 0;
};

export const getPreviousHourQtyByLineId = async (lineId, time) => {
	const sql = `
	SELECT 
		LineId,
		COUNT(LineId) AS qty
	FROM 
	(
		SELECT * FROM ordercompletes WHERE createdAt >= :start AND createdAt <= :end AND LineId = :lineId
		UNION
		SELECT * FROM ordercompletenodes WHERE createdAt >= :start AND createdAt <= :end AND LineId = :lineId
		UNION
		SELECT * FROM ordercompletecables WHERE createdAt >= :start AND createdAt <= :end AND LineId = :lineId
	) AS T_CURR_ORDER
	GROUP BY
		LineId`;

	console.log(lineId);

	const response = await connectionDatabase.query(sql, {
		type: QueryTypes.SELECT,
		replacements: {
			start: time.start,
			end: time.end,
			lineId,
		},
		logging: console.log,
	});

	if (response.length > 0) {
		return response[0].qty;
	}

	return 0;
};

export const getPreviousPlanningByLineId = async (
	lineId,
	sequenceRange,
	shiftType,
) => {
	const currentDate = new Date();
	const previousDay = addDays(currentDate, -1);
	const strCurrDate = format(currentDate, "yyyy-MM-dd");
	const strPreviousDate = format(previousDay, "yyyy-MM-dd");
	const currentHour = new Date().getHours();

	let date = strCurrDate;
	let sequenceWhere = "cbpd.sequence >= 1 AND cbpd.sequence <= 18";
	if (shiftType === "Long") {
		sequenceWhere = "cbpd.sequence >= 1 AND cbpd.sequence <= 17";
	}

	if (currentHour >= 0 && currentHour <= 6) {
		date = strPreviousDate;
		sequenceWhere = "cbpd.sequence >= :sequence";
	}

	const sql = `
		SELECT 
			cbp.LineId,
			SUM(qty) as qty
		FROM 
			controlboardplannings AS cbp 
		JOIN 
			controlboardplanningdetails as cbpd ON cbp.id = cbpd.ControlBoardPlanningId
		WHERE
			cbp.LineId = :lineId
			AND cbp.date = :date
			AND ${sequenceWhere}
			AND cbpd.time <= :time
		GROUP BY 
			cbp.LineId`;

	const response = await connectionDatabase.query(sql, {
		type: QueryTypes.SELECT,
		replacements: {
			date,
			lineId,
			time: sequenceRange,
		},
		logging: false
	});

	if (response.length > 0) {
		return response[0].qty;
	}

	return 0;
};
