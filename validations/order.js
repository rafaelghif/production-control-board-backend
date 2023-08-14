import { body, param } from "express-validator";

export const getOrderCompletesRule = [
    param("orderDate").notEmpty().withMessage("Order date cannot be null"),
    param("lineId").notEmpty().withMessage("LineId cannot be null")
];

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