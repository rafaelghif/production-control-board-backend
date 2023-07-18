import { body } from "express-validator";

export const getOrdersRule = [
    body("serialNumber").notEmpty().withMessage("Serial number cannot be null")
        .toUpperCase()
        .trim()
];

export const createOrderRule = [
    body("serialNumberType").notEmpty().withMessage("Serial number type cannot be null"),
    body("serialNumber").notEmpty().withMessage("Serial number type cannot be null")
        .toUpperCase()
        .trim(),
    body("LineId").notEmpty().withMessage("Line cannot be null")
        .isUUID("4").withMessage("Invalid id type"),
];