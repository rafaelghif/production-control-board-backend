import { Router } from "express";
import authenticationRouter from "./authentication.js";
import departmentRouter from "./department.js";
import lineRouter from "./line.js";
import userRouter from "./user.js";
import controlBoardSettingRouter from "./controlBoardSetting.js";
import controlBoardPlanningRouter from "./controlBoardPlanning.js";
import orderRouter from "./order.js";
import controlBoardRouter from "./controlBoard.js";

const router = Router();

router.use("/authentication", authenticationRouter);
router.use("/department", departmentRouter);
router.use("/line", lineRouter);
router.use("/user", userRouter);
router.use("/control-board", controlBoardRouter);
router.use("/control-board-setting", controlBoardSettingRouter);
router.use("/control-board-planning", controlBoardPlanningRouter);
router.use("/order", orderRouter);

export default router;