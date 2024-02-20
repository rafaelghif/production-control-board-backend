import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { errorLogging } from "../helpers/error.js";
import {
	base32ToBase10,
	getInhouseSerialNumber,
	getPlasmaOrderTag,
	getPlasmaOrderTagByBarcodeIssueNo,
	getPlasmaOrderTagByIndex,
} from "../helpers/order.js";
import models from "../models/index.js";

export const getOrders = async (req, res) => {
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

		const { serialNumber } = req.body;
		const serialNumberType =
			serialNumber.length === 9 ? "Plasma Order Tag" : "Inhouse";

		const order = await models.OrderComplete.findOne({
			where: {
				serialNumber: serialNumber,
			},
		});

		if (order) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Error!",
					message: "Serial number already added!",
					validationError: errors.array(),
				},
			});
		}

		let orderData = null;

		if (serialNumberType === "Plasma Order Tag") {
			orderData = getPlasmaOrderTag(serialNumber);
		} else if (serialNumberType === "Inhouse") {
			if (serialNumber.length === 10 || serialNumber.length === 11) {
				orderData = getInhouseSerialNumber(serialNumber);
			}
		}

		if (!orderData) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Error!",
					message:
						"Serial number not found! Please contact engineering!",
					validationError: errors.array(),
				},
			});
		}

		return res.status(200).json({
			message: "Success Search Order!",
			data: { serialNumberType: serialNumberType, ...orderData },
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

export const getOrdersNode = async (req, res) => {
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

		const { serialNumber } = req.body;
		const serialNumberType =
			serialNumber.length === 9 ? "Plasma Order Tag" : "Inhouse";

		const order = await models.OrderCompleteNode.findOne({
			where: {
				serialNumber: serialNumber,
			},
		});

		if (order) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Error!",
					message: "Serial number already added!",
					validationError: errors.array(),
				},
			});
		}

		let orderData = null;

		if (serialNumberType === "Plasma Order Tag") {
			orderData = getPlasmaOrderTag(serialNumber);
		} else if (serialNumberType === "Inhouse") {
			if (serialNumber.length === 10 || serialNumber.length === 11) {
				orderData = getInhouseSerialNumber(serialNumber);
			}
		}

		if (!orderData) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Error!",
					message:
						"Serial number not found! Please contact engineering!",
					validationError: errors.array(),
				},
			});
		}

		return res.status(200).json({
			message: "Success Search Order!",
			data: { serialNumberType: serialNumberType, ...orderData },
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

export const getOrderCables = async (req, res) => {
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

		const { indexNumber } = req.body;
		const serialNumberType = "Plasma Order Tag";
		const indexNumberBase10 = base32ToBase10(indexNumber)
			.toString()
			.padStart(10, "0")
			.substring(0, 8);

		const plasmaData = getPlasmaOrderTagByIndex(indexNumberBase10);

		if (!plasmaData) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Error!",
					message: `Index number ${indexNumberBase10} not found! Please contact engineering!`,
					validationError: errors.array(),
				},
			});
		}

		const barcodeIssueNo = plasmaData.barcodeIssueNo;

		const orderCount = await models.OrderCompleteCable.count({
			where: {
				barcodeIssueNo: barcodeIssueNo,
			},
		});

		plasmaData.scannedOrder = orderCount;

		return res.status(200).json({
			message: "Success Search Order!",
			data: { serialNumberType: serialNumberType, ...plasmaData },
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

export const createOrder = async (req, res) => {
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
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			LineId,
		} = req.body;
		const { badgeId } = req.decoded;

		const order = await models.OrderComplete.findOne({
			where: {
				serialNumber: serialNumber,
			},
		});

		if (order) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Duplicate!",
					message: "Duplicate serial number!",
					validationError: errors.array(),
				},
			});
		}

		const response = await models.OrderComplete.create({
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			createdBy: badgeId,
			updatedBy: badgeId,
			LineId,
		});

		return res.status(200).json({
			message: "Success Create Order!",
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

export const createOrderNode = async (req, res) => {
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
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			LineId,
		} = req.body;
		const { badgeId } = req.decoded;

		const order = await models.OrderCompleteNode.findOne({
			where: {
				serialNumber: serialNumber,
			},
		});

		if (order) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Duplicate!",
					message: "Duplicate serial number!",
					validationError: errors.array(),
				},
			});
		}

		const response = await models.OrderCompleteNode.create({
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			createdBy: badgeId,
			updatedBy: badgeId,
			LineId,
		});

		return res.status(200).json({
			message: "Success Create Order!",
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

export const createOrderCable = async (req, res) => {
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
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			LineId,
		} = req.body;
		const { badgeId } = req.decoded;

		const plasmaData = getPlasmaOrderTagByBarcodeIssueNo(barcodeIssueNo);

		const order = await models.OrderCompleteCable.count({
			where: {
				barcodeIssueNo: barcodeIssueNo,
			},
		});

		if (order >= plasmaData.orderQty) {
			return res.status(400).json({
				isExpressValidation: false,
				data: {
					title: "Duplicate!",
					message:
						"Order Already complete!, if have any question please contact engineering!",
					validationError: errors.array(),
				},
			});
		}

		const response = await models.OrderCompleteCable.create({
			serialNumberType,
			serialNumber,
			model,
			barcodeIssueNo,
			sapLinkageNo,
			createdBy: badgeId,
			updatedBy: badgeId,
			LineId,
		});

		return res.status(200).json({
			message: "Success Create Order!",
			data: response,
		});
	} catch (err) {
		console.log(err);
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

export const getOrderCompletes = async (req, res) => {
	try {
		const { search } = req.query;
		const { orderDate, lineId } = req.params;

		let where = {
			createdAt: {
				[Op.between]: [
					`${orderDate} : 00:00:00`,
					`${orderDate} : 23:59:59`,
				],
			},
			inActive: false,
		};

		if (lineId !== "All") {
			where = {
				...where,
				"$Line.id$": lineId,
			};
		}

		if (search) {
			where = {
				...where,
				[Op.or]: [
					{ model: { [Op.like]: `%${search}%` } },
					{ serialNumber: { [Op.like]: `%${search}%` } },
				],
			};
		}

		let response = await models.OrderComplete.findAll({
			order: [["createdAt", "DESC"]],
			where,
			include: [
				{
					model: models.Line,
					attributes: ["id", "name"],
				},
			],
		});

		let responseNode = await models.OrderCompleteNode.findAll({
			order: [["createdAt", "DESC"]],
			where,
			include: [
				{
					model: models.Line,
					attributes: ["id", "name"],
				},
			],
		});

		const responseCable = await models.OrderCompleteCable.findAll({
			order: [["createdAt", "DESC"]],
			where,
			include: [
				{
					model: models.Line,
					attributes: ["id", "name"],
				},
			],
		});

		response = [...response, ...responseNode, ...responseCable];

		return res.status(200).json({
			message: "Success Fetch Order Completes!",
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
