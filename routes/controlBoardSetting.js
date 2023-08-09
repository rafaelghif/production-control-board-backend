import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createControlBoardSettingRule, getControlBoardSettingByDepartmentRule, getControlBoardSettingByLineRule, updateControlBoardSettingRule } from "../validations/controlBoardSetting.js";
import { createControlBoardSetting, getControlBoardSetting, getControlBoardSettingByDepartment, getControlBoardSettingByLine, updateControlBoardSetting } from "../controllers/controlBoardSetting.js";

const controlBoardSettingRouter = Router();


controlBoardSettingRouter.get("/", [authVerify, getControlBoardSetting]);
controlBoardSettingRouter.get("/departmentId/:departmentId", [authVerify, getControlBoardSettingByDepartmentRule, getControlBoardSettingByDepartment]);
controlBoardSettingRouter.get("/lineId/:lineId", [authVerify, getControlBoardSettingByLineRule, getControlBoardSettingByLine]);
controlBoardSettingRouter.post("/", [authVerify, createControlBoardSettingRule, createControlBoardSetting]);
controlBoardSettingRouter.patch("/", [authVerify, updateControlBoardSettingRule, updateControlBoardSetting]);

export default controlBoardSettingRouter;