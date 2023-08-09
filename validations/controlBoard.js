import { param } from "express-validator";

export const getControlBoardsRule = [
    param("lineId").notEmpty().withMessage("Line cannot be null"),
    param("date").notEmpty().withMessage("Date cannot be null"),
];

export const getRemarkByLineAndDateRule = [
    param("lineId").notEmpty().withMessage("Line cannot be null"),
    param("date").notEmpty().withMessage("Date cannot be null"),
];