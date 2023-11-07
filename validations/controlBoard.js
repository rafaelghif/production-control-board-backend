import { param } from "express-validator";

export const getControlBoardsRule = [
    param("lineId").notEmpty().withMessage("Line cannot be null"),
    param("date").notEmpty().withMessage("Date cannot be null"),
];

export const getControlBoardsShiftRule = [
    param("lineId").notEmpty().withMessage("Line cannot be null"),
    param("date").notEmpty().withMessage("Date cannot be null"),
    param("shift").notEmpty().withMessage("Shift cannot be null"),
];

export const getRemarkByLineAndDateRule = [
    param("lineId").notEmpty().withMessage("Line cannot be null"),
    param("date").notEmpty().withMessage("Date cannot be null"),
];