import { Router } from "express";
import { getControlBoards } from "../controllers/controlBoard.js";
import { getControlBoardsRule } from "../validations/controlBoard.js";

const controlBoardRouter = Router();

controlBoardRouter.get("/line/:lineId/date/:date", [getControlBoardsRule, getControlBoards]);

export default controlBoardRouter;