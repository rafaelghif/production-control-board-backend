import { body, param } from "express-validator";

export const getLinesByDepartmentRule = [
	param("departmentId")
		.notEmpty()
		.withMessage("Department id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const getActiveLinesByDepartmentRule = [
	param("departmentId")
		.notEmpty()
		.withMessage("Department id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const createLineRule = [
	body("name").notEmpty().withMessage("Name cannot be null"),
	body("DepartmentId")
		.notEmpty()
		.withMessage("Department id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const updateLineRule = [
	body("id")
		.notEmpty()
		.withMessage("Id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
	body("name").notEmpty().withMessage("Name cannot be null"),
	body("inActive")
		.notEmpty()
		.withMessage("InActive cannot be null")
		.isBoolean()
		.withMessage("Invalid inActive type"),
	body("DepartmentId")
		.notEmpty()
		.withMessage("Department id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];
