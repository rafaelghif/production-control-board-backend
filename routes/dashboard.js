import { Router } from "express";

import {
	getDataFromAllLines,
	getDataFromAllLinesV2,
} from "../controllers/dashboard.js";

const dashboardRouter = Router();

// dashboardRouter.get("/date/:date", [getDataFromAllLines]);
dashboardRouter.get("/date/:date", [getDataFromAllLinesV2]);
dashboardRouter.get("/v2/date/:date", [getDataFromAllLinesV2]);

export default dashboardRouter;
