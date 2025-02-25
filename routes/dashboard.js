import { Router } from "express";

import { getDataFromAllLines } from "../controllers/dashboard.js";

const dashboardRouter = Router();

dashboardRouter.get("/date/:date", [getDataFromAllLines]);

export default dashboardRouter;
