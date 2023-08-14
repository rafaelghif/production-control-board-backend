import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createOrderRule, getOrderCompletesRule, getOrdersRule } from "../validations/order.js";
import { createOrder, getOrderCompletes, getOrders } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.get("/orderDate/:orderDate/lineId/:lineId", [authVerify, getOrderCompletesRule, getOrderCompletes]);
orderRouter.post("/", [authVerify, createOrderRule, createOrder]);
orderRouter.post("/input", [authVerify, getOrdersRule, getOrders]);


export default orderRouter;