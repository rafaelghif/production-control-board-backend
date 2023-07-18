import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createControlBoardPlanning, getControlBoardPlanning, getControlBoardPlanningDetail, updateControlBoardPlanning, updateControlBoardPlanningDetail } from "../controllers/controlBoardPlanning.js";
import { createControlBoardPlanningRule, getControlBoardPlanningDetailRule, getControlBoardPlanningRule, updateControlBoardPlanningDetailRule, updateControlBoardPlanningRule } from "../validations/controlBoardPlanning.js";

const controlBoardPlanningRouter = Router();


controlBoardPlanningRouter.get("/lineId/:lineId", [authVerify, getControlBoardPlanningRule, getControlBoardPlanning]);
controlBoardPlanningRouter.get("/detail/controlBoardPlanningId/:controlBoardPlanningId", [authVerify, getControlBoardPlanningDetailRule, getControlBoardPlanningDetail]);
controlBoardPlanningRouter.post("/", [authVerify, createControlBoardPlanningRule, createControlBoardPlanning]);
controlBoardPlanningRouter.patch("/", [authVerify, updateControlBoardPlanningRule, updateControlBoardPlanning]);
controlBoardPlanningRouter.patch("/detail", [authVerify, updateControlBoardPlanningDetailRule, updateControlBoardPlanningDetail]);

export default controlBoardPlanningRouter;