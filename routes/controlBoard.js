import { Router } from "express";
import { getControlBoards, getRemarkByLineAndDate } from "../controllers/controlBoard.js";
import { getControlBoardsRule, getRemarkByLineAndDateRule } from "../validations/controlBoard.js";

const controlBoardRouter = Router();

controlBoardRouter.get("/line/:lineId/date/:date", [getControlBoardsRule, getControlBoards]);
controlBoardRouter.get("/remark/line/:lineId/date/:date", [getRemarkByLineAndDateRule, getRemarkByLineAndDate]);

export default controlBoardRouter;