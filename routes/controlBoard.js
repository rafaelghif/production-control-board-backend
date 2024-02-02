import { Router } from "express";

import {
	getControlBoards,
	getControlBoardsShift,
	getPtrPerLine,
	getPtrPerLineSql,
	getRemarkByLineAndDate,
} from "../controllers/controlBoard.js";
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

export default controlBoardRouter;
