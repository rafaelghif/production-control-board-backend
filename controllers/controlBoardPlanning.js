import { validationResult } from "express-validator";

import connectionDatabase from "../configs/database.js";
import { errorLogging } from "../helpers/error.js";
import models from "../models/index.js";

export const getControlBoardPlanning = async (req, res) => {
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

		const { lineId } = req.params;
		const { id } = req.decoded;

		let where = {};
		let whereLine = {};

		if (lineId && lineId !== "All") {
			where = {
				...where,
				LineId: lineId,
			};
		} else {
			const department = await models.Department.findOne({
				where: {
					inActive: false,
				},
				include: [
					{
						model: models.User,
						attributes: [],
						where: {
							id: id,
						},
					},
				],
			});

			whereLine = {
				DepartmentId: department.id,
			};
		}

		const response = await models.ControlBoardPlanning.findAll({
			order: [["date", "DESC"]],
			where,
			include: [
				{
					model: models.Line,
					attributes: ["id", "name"],
					required: true,
					where: whereLine,
				},
			],
		});

		return res.status(200).json({
			message: "Success Fetch Control Planning!",
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

export const getControlBoardPlanningDetail = async (req, res) => {
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

		const { controlBoardPlanningId } = req.params;
		const response = await models.ControlBoardPlanningDetail.findAll({
			order: [["sequence", "ASC"]],
			where: {
				ControlBoardPlanningId: controlBoardPlanningId,
			},
		});

		return res.status(200).json({
			message: "Success Fetch Control Planning Detail!",
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

export const createControlBoardPlanning = async (req, res) => {
	const transaction = await connectionDatabase.transaction();
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

		const { planning, planningDetails } = req.body;
		const { badgeId } = req.decoded;

		const checkPlanning = await models.ControlBoardPlanning.findOne(
			{
				where: {
					date: planning.date,
					LineId: planning.LineId,
				},
			},
			{ transaction },
		);

		if (checkPlanning) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Duplicate!",
					message: "Planning date already added!",
					validationError: errors.array(),
				},
			});
		}

		const controlBoardPlanning = await models.ControlBoardPlanning.create(
			{
				shift: planning.shift,
				date: planning.date,
				actualWorkingTimeAll: planning.actualWorkingTimeAll,
				productLoadingPlanQty: planning.productLoadingPlanQty,
				productLoadingPlanBacklogQty:
					planning.productLoadingPlanBacklogQty,
				tackTime: planning.tackTime,
				totalProcessTime: planning.totalProcessTime,
				actualWorkingTime: planning.actualWorkingTime,
				actualWorkingTimeOvertime: planning.actualWorkingTimeOvertime,
				manPowerCount: planning.manPowerCount,
				manPowerAdditionalCount: planning.manPowerAdditionalCount,
				manPowerAbleToSpare: planning.manPowerAbleToSpare,
				createdBy: badgeId,
				updatedBy: badgeId,
				LineId: planning.LineId,
			},
			{ transaction },
		);

		for (const planningDetail of planningDetails) {
			const { time, sequence, qty, remark, breakTime } = planningDetail;
			await models.ControlBoardPlanningDetail.create(
				{
					time,
					sequence,
					qty,
					remark,
					breakTime,
					createdBy: badgeId,
					updatedBy: badgeId,
					ControlBoardPlanningId: controlBoardPlanning.id,
				},
				{ transaction },
			);
		}

		transaction.commit();

		return res.status(200).json({
			message: "Success Create Control Board Planning!",
			data: null,
		});
	} catch (err) {
		transaction.rollback();
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

export const updateControlBoardPlanning = async (req, res) => {
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
			shift,
			date,
			actualWorkingTimeAll,
			productLoadingPlanQty,
			productLoadingPlanBacklogQty,
			tackTime,
			totalProcessTime,
			actualWorkingTime,
			actualWorkingTimeOvertime,
			manPowerCount,
			manPowerAdditionalCount,
			manPowerAbleToSpare,
			LineId,
		} = req.body;

		const { badgeId } = req.decoded;

		const checkPlanning = await models.ControlBoardPlanning.count({
			where: {
				date: date,
				LineId: LineId,
			},
		});

		if (checkPlanning > 1) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Duplicate!",
					message: "Planning date already added!",
					validationError: errors.array(),
				},
			});
		}

		const response = await models.ControlBoardPlanning.update(
			{
				shift,
				date,
				actualWorkingTimeAll,
				productLoadingPlanQty,
				productLoadingPlanBacklogQty,
				tackTime,
				totalProcessTime,
				actualWorkingTime,
				actualWorkingTimeOvertime,
				manPowerCount,
				manPowerAdditionalCount,
				manPowerAbleToSpare,
				updatedBy: badgeId,
			},
			{ where: { id } },
		);

		return res.status(200).json({
			message: "Success Update Control Board!",
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

export const updateControlBoardPlanningDetail = async (req, res) => {
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

		const { id, qty, remark, breakTime } = req.body;
		const { badgeId } = req.decoded;

		const response = await models.ControlBoardPlanningDetail.update(
			{
				qty,
				remark,
				breakTime,
				updatedBy: badgeId,
			},
			{ where: { id } },
		);

		return res.status(200).json({
			message: "Success Update Control Board Detail!",
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
