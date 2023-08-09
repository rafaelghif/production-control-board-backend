import { body, param } from "express-validator";

export const getControlBoardPlanningRule = [
    param("lineId").notEmpty().withMessage("Line id cannot be null")
];

export const getControlBoardPlanningDetailRule = [
    param("controlBoardPlanningId").notEmpty().withMessage("Line id cannot be null")
        .isUUID("4").withMessage("Invalid id type")
];

export const createControlBoardPlanningRule = [
    body("planning").notEmpty().withMessage("Planning cannot be null")
        .isObject().withMessage("Invalid planning type"),
    body("planningDetails").notEmpty().withMessage("Planning Detail cannot be null")
        .isArray().withMessage("Invalid planning details type")
];

export const updateControlBoardPlanningRule = [
    body("id").notEmpty().withMessage("Id cannot be null")
        .isUUID("4").withMessage("Invalid id type"),
    body("date").notEmpty().withMessage("Date cannot be null"),
    body("actualWorkingTimeAll").notEmpty().withMessage("Actual working time cannot be null"),
    body("productLoadingPlanQty").notEmpty().withMessage("Plan qty cannot be null"),
    body("tackTime").notEmpty().withMessage("Shift total cannot be null"),
    body("totalProcessTime").notEmpty().withMessage("Shift total cannot be null"),
    body("actualWorkingTime").notEmpty().withMessage("Shift total cannot be null"),
    body("manPowerCount").notEmpty().withMessage("Shift total cannot be null"),
    body("LineId").notEmpty().withMessage("Line id cannot be null")
        .isUUID("4").withMessage("Invalid id type"),
];

export const updateControlBoardPlanningDetailRule = [
    body("id").notEmpty().withMessage("Id cannot be null")
        .isUUID("4").withMessage("Invalid id type"),
    body("qty").notEmpty().withMessage("Qty cannot be null")
        .toInt(),
];