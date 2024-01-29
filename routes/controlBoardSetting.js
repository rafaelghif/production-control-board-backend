import { Router } from "express";

import {
	createControlBoardSetting,
	getControlBoardSetting,
	getControlBoardSettingByDepartment,
	getControlBoardSettingByLine,
	getControlBoardSettingDetail,
	updateControlBoardSetting,
	updateControlBoardSettingDetail,
} from "../controllers/controlBoardSetting.js";
import { authVerify } from "../middlewares/auth.js";
import {
	createControlBoardSettingRule,
	getControlBoardSettingByDepartmentRule,
	getControlBoardSettingByLineRule,
	getControlBoardSettingDetailRule,
	updateControlBoardSettingDetailRule,
	updateControlBoardSettingRule,
} from "../validations/controlBoardSetting.js";

const controlBoardSettingRouter = Router();

controlBoardSettingRouter.get("/", [authVerify, getControlBoardSetting]);
controlBoardSettingRouter.get("/departmentId/:departmentId", [
	authVerify,
	getControlBoardSettingByDepartmentRule,
	getControlBoardSettingByDepartment,
]);
controlBoardSettingRouter.get(
	"/detail/controlBoardSettingId/:controlBoardSettingId",
	[
		authVerify,
		getControlBoardSettingDetailRule,
		getControlBoardSettingDetail,
	],
);
controlBoardSettingRouter.get("/lineId/:lineId", [
	authVerify,
	getControlBoardSettingByLineRule,
	getControlBoardSettingByLine,
]);
controlBoardSettingRouter.post("/", [
	authVerify,
	createControlBoardSettingRule,
	createControlBoardSetting,
]);
controlBoardSettingRouter.patch("/", [
	authVerify,
	updateControlBoardSettingRule,
	updateControlBoardSetting,
]);
controlBoardSettingRouter.patch("/detail", [
	authVerify,
	updateControlBoardSettingDetailRule,
	updateControlBoardSettingDetail,
]);

export default controlBoardSettingRouter;
