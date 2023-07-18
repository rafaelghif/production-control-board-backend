import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createLine, getActiveLines, getActiveLinesByDepartment, getLines, getLinesByDepartment, updateLine } from "../controllers/line.js";
import { createLineRule, getActiveLinesByDepartmentRule, getLinesByDepartmentRule, updateLineRule } from "../validations/line.js";

const lineRouter = Router();

lineRouter.get("/", [authVerify, getLines]);
lineRouter.get("/active", [getActiveLines]);
lineRouter.get("/departmentId/:departmentId", [authVerify, getLinesByDepartmentRule, getLinesByDepartment]);
lineRouter.get("/active/departmentId/:departmentId", [authVerify, getActiveLinesByDepartmentRule, getActiveLinesByDepartment]);
lineRouter.post("/", [authVerify, createLineRule, createLine]);
lineRouter.patch("/", [authVerify, updateLineRule, updateLine]);

export default lineRouter;