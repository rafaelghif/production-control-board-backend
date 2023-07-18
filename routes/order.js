import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createOrderRule, getOrdersRule } from "../validations/order.js";
import { createOrder, getOrders } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.post("/", [authVerify, createOrderRule, createOrder]);
orderRouter.post("/input", [authVerify, getOrdersRule, getOrders]);

export default orderRouter;