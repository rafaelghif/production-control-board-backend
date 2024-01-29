import { Router } from "express";

import { authentication } from "../controllers/authentication.js";

const authenticationRouter = Router();

authenticationRouter.post("/", authentication);

export default authenticationRouter;
