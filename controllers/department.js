import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";

export const getDepartments = async (req, res) => {
    try {
        const response = await models.Department.findAll({
            order: [["name", "ASC"]]
        });

        return res.status(200).json({
            message: "Success Fetch Departments!",
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

export const getActiveDepartments = async (req, res) => {
    try {
        const response = await models.Department.findAll({
            order: [["name", "ASC"]],
            where: {
                inActive: false
            }
        });

        return res.status(200).json({
            message: "Success Fetch Active Departments!",
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

export const createDepartment = async (req, res) => {
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

        const { name, abbreviation } = req.body;
        const { badgeId } = req.decoded;

        const response = await models.Department.create({
            name,
            abbreviation,
            createdBy: badgeId,
            updatedBy: badgeId
        });

        return res.status(200).json({
            message: `Success Create Department!`,
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

export const updateDepartment = async (req, res) => {
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

        const { id, name, abbreviation, inActive } = req.body;
        const { badgeId } = req.decoded;

        const response = await models.Department.update({
            name,
            abbreviation,
            inActive,
            updatedBy: badgeId
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Update Department!`,
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