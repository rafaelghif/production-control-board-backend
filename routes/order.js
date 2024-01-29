import { Router } from "express";

import {
	createOrder,
	createOrderCable,
	getOrderCables,
	getOrderCompletes,
	getOrders,
} from "../controllers/order.js";
import { authVerify } from "../middlewares/auth.js";
import {
	createOrderCableRule,
	createOrderRule,
	getOrderCablesRule,
	getOrderCompletesRule,
	getOrdersRule,
} from "../validations/order.js";

const orderRouter = Router();

orderRouter.get("/orderDate/:orderDate/lineId/:lineId", [
	authVerify,
	getOrderCompletesRule,
	getOrderCompletes,
]);
orderRouter.post("/", [authVerify, createOrderRule, createOrder]);
orderRouter.post("/cable", [
	authVerify,
	createOrderCableRule,
	createOrderCable,
]);
orderRouter.post("/input", [authVerify, getOrdersRule, getOrders]);
orderRouter.post("/input-cable", [
	authVerify,
	getOrderCablesRule,
	getOrderCables,
]);

export default orderRouter;
