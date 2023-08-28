import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import connectionDatabase from "../configs/database.js";

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
        return res.status(500).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const getControlBoardSettingDetail = async (req, res) => {
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

        const { controlBoardSettingId } = req.params;

        const response = await models.ControlBoardSettingDetail.findAll({
            order: [["sequence", "ASC"]],
            where: {
                ControlBoardSettingId: controlBoardSettingId
            }
        });

        return res.status(200).json({
            message: "Success Fetch Control Setting Detail!",
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
        return res.status(500).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const getControlBoardSettingByLine = async (req, res) => {
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

        const { lineId } = req.params;

        const response = await models.ControlBoardSetting.findOne({
            where: {
                LineId: lineId
            },
            include: [{
                model: models.ControlBoardSettingDetail,
            }],
            order: [[models.ControlBoardSettingDetail, "sequence", "ASC"]]
        });

        return res.status(200).json({
            message: "Success Fetch Control Board Setting By Line!",
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


export const createControlBoardSetting = async (req, res) => {
    const transaction = await connectionDatabase.transaction();
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

        const { setting, settingDetails } = req.body;
        const { badgeId } = req.decoded;

        const controlBoardSetting = await models.ControlBoardSetting.create({
            actualWorkingTimeAll: setting.actualWorkingTimeAll,
            productLoadingPlanQty: setting.productLoadingPlanQty,
            productLoadingPlanBacklogQty: setting.productLoadingPlanBacklogQty,
            tackTime: setting.tackTime,
            totalProcessTime: setting.totalProcessTime,
            actualWorkingTime: setting.actualWorkingTime,
            actualWorkingTimeOvertime: setting.actualWorkingTimeOvertime,
            manPowerCount: setting.manPowerCount,
            manPowerAdditionalCount: setting.manPowerAdditionalCount,
            manPowerAbleToSpare: setting.manPowerAbleToSpare,
            createdBy: badgeId,
            updatedBy: badgeId,
            LineId: setting.LineId
        }, { transaction });

        for (const settingDetail of settingDetails) {
            const { time, sequence, qty } = settingDetail;
            await models.ControlBoardSettingDetail.create({
                time,
                sequence,
                qty,
                createdBy: badgeId,
                updatedBy: badgeId,
                ControlBoardSettingId: controlBoardSetting.id
            }, { transaction });
        }

        transaction.commit();

        return res.status(200).json({
            message: `Success Create Control Board Setting!`,
            data: controlBoardSetting
        });
    } catch (err) {
        transaction.rollback();
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

        const {
            id,
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
            inActive,
            LineId
        } = req.body;

        const { badgeId } = req.decoded;

        const response = await models.ControlBoardSetting.update({
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
        return res.status(500).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}

export const updateControlBoardSettingDetail = async (req, res) => {
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

        const { id, qty } = req.body;
        const { badgeId } = req.decoded;

        const response = await models.ControlBoardSettingDetail.update({
            qty,
            updatedBy: badgeId
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Update Control Board Detail!`,
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