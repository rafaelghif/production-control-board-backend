import { Router } from "express";

import {
	getControlBoards,
	getControlBoardsShift,
	getPtrPerLine,
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

export default controlBoardRouter;
