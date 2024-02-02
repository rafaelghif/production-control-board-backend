import { validationResult } from "express-validator";
import { QueryTypes } from "sequelize";

import { connectionDatabaseSql } from "../configs/database.js";
import { errorLogging } from "../helpers/error.js";
import models from "../models/index.js";

export const getLines = async (req, res) => {
	try {
		const response = await models.Line.findAll({
			order: [["name", "ASC"]],
		});

		return res.status(200).json({
			message: "Success Fetch Lines!",
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

export const getActiveLines = async (req, res) => {
	try {
		const response = await models.Line.findAll({
			order: [["name", "ASC"]],
			where: {
				inActive: false,
			},
		});

		return res.status(200).json({
			message: "Success Fetch Active Lines!",
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

export const getActiveLinesSql = async (req, res) => {
	try {
		const response = await connectionDatabaseSql.query(
			"SELECT DISTINCT [YMBLine] as name FROM [dbpp].[PC].[tblYMBLine] WHERE [InActive] = 0 ORDER BY [YMBLine] ASC",
			{ type: QueryTypes.SELECT},
		);

		return res.status(200).json({
			message: "Success Fetch Active Lines SQL!",
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

export const getLinesByDepartment = async (req, res) => {
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

		const { departmentId } = req.params;

		const response = await models.Line.findAll({
			order: [["name", "ASC"]],
			where: {
				DepartmentId: departmentId,
			},
		});

		return res.status(200).json({
			message: "Success Fetch Lines By Department Id!",
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

export const getActiveLinesByDepartment = async (req, res) => {
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

		const { departmentId } = req.params;

		const response = await models.Line.findAll({
			order: [["name", "ASC"]],
			where: {
				DepartmentId: departmentId,
				inActive: false,
			},
		});

		return res.status(200).json({
			message: "Success Fetch Active Lines By Department Id!",
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

export const createLine = async (req, res) => {
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

		const { name, DepartmentId } = req.body;
		const { badgeId } = req.decoded;

		const response = await models.Line.create({
			name,
			createdBy: badgeId,
			updatedBy: badgeId,
			DepartmentId,
		});

		return res.status(200).json({
			message: "Success Create Line!",
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

export const updateLine = async (req, res) => {
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

		const { id, name, inActive } = req.body;
		const { badgeId } = req.decoded;

		const response = await models.Line.update(
			{
				name,
				inActive,
				updatedBy: badgeId,
			},
			{ where: { id } },
		);

		return res.status(200).json({
			message: "Success Update Line!",
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
