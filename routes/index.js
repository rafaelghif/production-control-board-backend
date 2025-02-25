import { Router } from "express";

import authenticationRouter from "./authentication.js";
import controlBoardRouter from "./controlBoard.js";
import controlBoardPlanningRouter from "./controlBoardPlanning.js";
import controlBoardSettingRouter from "./controlBoardSetting.js";
import dashboardRouter from "./dashboard.js";
import departmentRouter from "./department.js";
import lineRouter from "./line.js";
import orderRouter from "./order.js";
import userRouter from "./user.js";

const router = Router();

router.use("/authentication", authenticationRouter);
router.use("/department", departmentRouter);
router.use("/line", lineRouter);
router.use("/user", userRouter);
router.use("/control-board", controlBoardRouter);
router.use("/control-board-setting", controlBoardSettingRouter);
router.use("/control-board-planning", controlBoardPlanningRouter);
router.use("/order", orderRouter);
router.use("/dashboard", dashboardRouter);

export default router;
