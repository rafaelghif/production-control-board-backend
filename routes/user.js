import { Router } from "express";

import { createUser, getUsers, updateUser } from "../controllers/user.js";
import { authVerify } from "../middlewares/auth.js";
import { createUserRule, updateUserRule } from "../validations/user.js";

const userRouter = Router();

userRouter.get("/", [authVerify, getUsers]);
userRouter.post("/", [authVerify, createUserRule, createUser]);
userRouter.patch("/", [authVerify, updateUserRule, updateUser]);

export default userRouter;
