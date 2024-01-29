import { body, param } from "express-validator";

export const getControlBoardSettingByDepartmentRule = [
	param("departmentId")
		.notEmpty()
		.withMessage("Department id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const getControlBoardSettingByLineRule = [
	param("lineId")
		.notEmpty()
		.withMessage("Line id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const createControlBoardSettingRule = [
	body("setting")
		.notEmpty()
		.withMessage("Setting cannot be null")
		.isObject()
		.withMessage("Invalid setting type"),
	body("settingDetails")
		.notEmpty()
		.withMessage("Setting Detail cannot be null")
		.isArray()
		.withMessage("Invalid planning details type"),
];

export const getControlBoardSettingDetailRule = [
	param("controlBoardSettingId")
		.notEmpty()
		.withMessage("Setting id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const updateControlBoardSettingRule = [
	body("id")
		.notEmpty()
		.withMessage("Id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
	body("actualWorkingTimeAll")
		.notEmpty()
		.withMessage("Actual working time cannot be null"),
	body("productLoadingPlanQty")
		.notEmpty()
		.withMessage("Plan qty cannot be null"),
	body("tackTime").notEmpty().withMessage("Shift total cannot be null"),
	body("totalProcessTime")
		.notEmpty()
		.withMessage("Shift total cannot be null"),
	body("actualWorkingTime")
		.notEmpty()
		.withMessage("Shift total cannot be null"),
	body("manPowerCount").notEmpty().withMessage("Shift total cannot be null"),
	body("inActive")
		.notEmpty()
		.withMessage("InActive cannot be null")
		.isBoolean()
		.withMessage("Invalid inActive type"),
	body("LineId")
		.notEmpty()
		.withMessage("Line id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const updateControlBoardSettingDetailRule = [
	body("id")
		.notEmpty()
		.withMessage("Id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
	body("qty").notEmpty().withMessage("Qty cannot be null").toInt(),
];
