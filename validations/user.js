import { body } from "express-validator";

export const createUserRule = [
	body("badgeId").notEmpty().withMessage("BadgeId cannot be null"),
	body("password").notEmpty().withMessage("Password cannot be null"),
	body("name").notEmpty().withMessage("Name cannot be null"),
	body("role").notEmpty().withMessage("Role cannot be null"),
	body("DepartmentId")
		.notEmpty()
		.withMessage("Role cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];

export const updateUserRule = [
	body("id")
		.notEmpty()
		.withMessage("Id cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
	body("badgeId").notEmpty().withMessage("BadgeId cannot be null"),
	body("password").notEmpty().withMessage("Password cannot be null"),
	body("name").notEmpty().withMessage("Name cannot be null"),
	body("role").notEmpty().withMessage("Role cannot be null"),
	body("inActive")
		.notEmpty()
		.withMessage("InActive cannot be null")
		.isBoolean()
		.withMessage("Invalid inActive type"),
	body("DepartmentId")
		.notEmpty()
		.withMessage("Role cannot be null")
		.isUUID("4")
		.withMessage("Invalid id type"),
];
