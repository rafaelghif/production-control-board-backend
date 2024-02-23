import { Router } from "express";

import {
	createPartOrder,
	getControlBoards,
	getControlBoardsShift,
	getPtrPerLine,
	getPtrPerLineSql,
	getPtsPartNotRegister,
	getRemarkByLineAndDate,
} from "../controllers/controlBoard.js";
import { authVerify } from "../middlewares/auth.js";
import {
	getControlBoardsRule,
	getControlBoardsShiftRule,
	getPtrPerLineRule,
	getRemarkByLineAndDateRule,
} from "../validations/controlBoard.js";

const controlBoardRouter = Router();

controlBoardRouter.get("/line/:lineId/date/:date", [
	getControlBoardsRule,
	getControlBoards,
]);
controlBoardRouter.get("/line/:lineId/date/:date/shift/:shift", [
	getControlBoardsShiftRule,
	getControlBoardsShift,
]);
controlBoardRouter.get("/remark/line/:lineId/date/:date", [
	getRemarkByLineAndDateRule,
	getRemarkByLineAndDate,
]);
controlBoardRouter.get("/ptr/line/:lineId/month/:month/year/:year", [
	getPtrPerLineRule,
	getPtrPerLine,
]);

controlBoardRouter.get("/ptr-pts/line/:lineId/month/:month/year/:year", [
	getPtrPerLineRule,
	getPtrPerLineSql,
]);

controlBoardRouter.get("/part-not-registered", [
	authVerify,
	getPtsPartNotRegister,
]);

controlBoardRouter.post("/part-not-registered", [authVerify, createPartOrder]);

export default controlBoardRouter;
