import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { errorLogging } from "../helpers/error.js";
import models from "../models/index.js";

export const getUsers = async (req, res) => {
	try {
		const { search } = req.query;

		let where = {};

		if (search) {
			where = {
				[Op.or]: [
					{ id: search },
					{ badgeId: { [Op.like]: `%${search}%` } },
					{ name: { [Op.like]: `%${search}%` } },
				],
			};
		}

		const response = await models.User.findAll({
			order: [["badgeId", "ASC"]],
			where,
			include: [
				{
					model: models.Department,
					attributes: ["id", "name"],
				},
				{
					model: models.Line,
					attributes: ["id", "name"],
				},
			],
		});

		return res.status(200).json({
			message: "Success Fetch Users!",
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

export const createUser = async (req, res) => {
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

		const { badgeId, password, name, role, DepartmentId, LineId } =
			req.body;
		const { badgeId: by } = req.decoded;

		const response = await models.User.create({
			badgeId,
			password,
			name,
			role,
			createdBy: by,
			updatedBy: by,
			DepartmentId,
			LineId: LineId || null,
		});

		return res.status(200).json({
			message: "Success Create User!",
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

export const updateUser = async (req, res) => {
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

		const {
			id,
			badgeId,
			password,
			name,
			role,
			DepartmentId,
			LineId,
			inActive,
		} = req.body;
		const { badgeId: by } = req.decoded;

		const user = await models.User.findByPk(id);

		const response = await models.User.update(
			{
				badgeId,
				password: password === user.password ? undefined : password,
				name,
				role,
				inActive,
				updatedBy: by,
				DepartmentId,
				LineId: LineId || null,
			},
			{ where: { id } },
		);

		return res.status(200).json({
			message: "Success Update User!",
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
