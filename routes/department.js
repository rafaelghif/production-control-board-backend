import { Router } from "express";

import {
	createDepartment,
	getActiveDepartments,
	getDepartments,
	updateDepartment,
} from "../controllers/department.js";
import { authVerify } from "../middlewares/auth.js";
import {
	createDepartmentRule,
	updateDepartmentRule,
} from "../validations/department.js";

const departmentRouter = Router();

departmentRouter.get("/", [authVerify, getDepartments]);
departmentRouter.get("/active", [authVerify, getActiveDepartments]);
departmentRouter.post("/", [
	authVerify,
	createDepartmentRule,
	createDepartment,
]);
departmentRouter.patch("/", [
	authVerify,
	updateDepartmentRule,
	updateDepartment,
]);

export default departmentRouter;
