import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createDepartment, getActiveDepartments, getDepartments, updateDepartment } from "../controllers/department.js";
import { createDepartmentRule, updateDepartmentRule } from "../validations/department.js";

const departmentRouter = Router();

departmentRouter.get("/", [authVerify, getDepartments]);
departmentRouter.get("/active", [authVerify, getActiveDepartments]);
departmentRouter.post("/", [authVerify, createDepartmentRule, createDepartment]);
departmentRouter.patch("/", [authVerify, updateDepartmentRule, updateDepartment]);

export default departmentRouter;