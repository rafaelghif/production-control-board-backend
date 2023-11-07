import { Router } from "express";
import { getControlBoards, getControlBoardsShift, getRemarkByLineAndDate } from "../controllers/controlBoard.js";
import { getControlBoardsRule, getControlBoardsShiftRule, getRemarkByLineAndDateRule } from "../validations/controlBoard.js";

const controlBoardRouter = Router();

controlBoardRouter.get("/line/:lineId/date/:date", [getControlBoardsRule, getControlBoards]);
controlBoardRouter.get("/line/:lineId/date/:date/shift/:shift", [getControlBoardsShiftRule, getControlBoardsShift]);
controlBoardRouter.get("/remark/line/:lineId/date/:date", [getRemarkByLineAndDateRule, getRemarkByLineAndDate]);

export default controlBoardRouter;