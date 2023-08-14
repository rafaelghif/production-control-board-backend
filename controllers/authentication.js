import { validationResult } from "express-validator";
import models from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { errorLogging } from "../helpers/error.js";

export const authentication = async (req, res) => {
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

        const { badgeId, password } = req.body;

        const user = await models.User.findOne({
            attributes: ["id", "badgeId", "password", "name", "role"],
            where: {
                badgeId,
                inActive: false
            },
            include: [{
                model: models.Department,
                attributes: ["id", "name", "abbreviation"]
            }, {
                model: models.Line,
                attributes: ["id", "name"]
            }]
        });

        if (!user) {
            return res.status(400).json({
                isExpressValidation: false,
                data: {
                    title: "Authentication Failed!",
                    message: "Badge Id Not Found! Please Contact Engineering!"
                }
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                isExpressValidation: false,
                data: {
                    title: "Authentication Failed!",
                    message: "Wrong Password! Please Contact Engineering!"
                }
            });
        }

        const token = jwt.sign({ id: user.id, badgeId: user.badgeId }, process.env.JWT_KEY);

        const userData = {
            id: user.id,
            badgeId: user.badgeId,
            name: user.name,
            role: user.role
        }

        const department = {
            id: user.Department.id,
            name: user.Department.name,
            abbreviation: user.Department.abbreviation
        }

        const line = {
            id: user.Line?.id,
            name: user.Line?.name,
        }

        return res.status(200).json({
            message: `Welcome ${user.name}`,
            data: {
                user: userData,
                department,
                line,
                token
            }
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