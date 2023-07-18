import { body, param } from "express-validator";

export const getControlBoardSettingByDepartmentRule = [
    param("departmentId").notEmpty().withMessage("Department id cannot be null")
        .isUUID("4").withMessage("Invalid id type")
];

export const createControlBoardSettingRule = [
    body("actualWorkingTime").notEmpty().withMessage("Actual working time cannot be null"),
    body("planQty").notEmpty().withMessage("Plan qty cannot be null"),
    body("manPowerRegular").notEmpty().withMessage("Man power regular cannot be null"),
    body("shiftTotal").notEmpty().withMessage("Shift total cannot be null"),
    body("LineId").notEmpty().withMessage("Line id cannot be null")
        .isUUID("4").withMessage("Invalid id type")
];

export const updateControlBoardSettingRule = [
    body("id").notEmpty().withMessage("Id cannot be null")
        .isUUID("4").withMessage("Invalid id type"),
    body("actualWorkingTime").notEmpty().withMessage("Actual working time cannot be null"),
    body("planQty").notEmpty().withMessage("Plan qty cannot be null"),
    body("manPowerRegular").notEmpty().withMessage("Man power regular cannot be null"),
    body("shiftTotal").notEmpty().withMessage("Shift total cannot be null"),
    body("inActive").notEmpty().withMessage("InActive cannot be null")
        .isBoolean().withMessage("Invalid inActive type"),
    body("LineId").notEmpty().withMessage("Line id cannot be null")
        .isUUID("4").withMessage("Invalid id type")
];