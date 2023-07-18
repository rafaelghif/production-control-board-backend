import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";

export const getControlBoardSetting = async (req, res) => {
    try {
        const response = await models.ControlBoardSetting.findAll({
            order: [[models.Line, "name", "ASC"]],
            include: [{
                attributes: ["id", "name"],
                model: models.Line,
                required: true
            }]
        });

        return res.status(200).json({
            message: "Success Fetch Control Board Setting!",
            data: response
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(401).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const getControlBoardSettingByDepartment = async (req, res) => {
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

        const { departmentId } = req.params;

        const response = await models.ControlBoardSetting.findAll({
            order: [[models.Line, "name", "ASC"]],
            include: [{
                attributes: ["id", "name"],
                model: models.Line,
                where: {
                    DepartmentId: departmentId
                },
                required: true
            }]
        });

        return res.status(200).json({
            message: "Success Fetch Control Board Setting By Department!",
            data: response
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(401).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const createControlBoardSetting = async (req, res) => {
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

        const { actualWorkingTime, planQty, manPowerRegular, shiftTotal, LineId } = req.body;
        const { badgeId } = req.decoded;

        const response = await models.ControlBoardSetting.create({
            actualWorkingTime,
            planQty,
            manPowerRegular,
            shiftTotal,
            createdBy: badgeId,
            updatedBy: badgeId,
            LineId
        });

        return res.status(200).json({
            message: `Success Create Control Board Setting!`,
            data: response
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(401).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const updateControlBoardSetting = async (req, res) => {
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

        const { id, actualWorkingTime, planQty, manPowerRegular, shiftTotal, inActive, LineId } = req.body;
        const { badgeId } = req.decoded;

        const response = await models.ControlBoardSetting.update({
            actualWorkingTime,
            planQty,
            manPowerRegular,
            shiftTotal,
            inActive,
            updatedBy: badgeId,
            LineId
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Create Control Board Setting!`,
            data: response
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(401).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}