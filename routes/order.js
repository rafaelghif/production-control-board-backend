import { Router } from "express";

import {
	createOrder,
	createOrderCable,
	createOrderNode,
	getOrderCables,
	getOrderCompletes,
	getOrders,
	getOrdersNode,
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
orderRouter.post("/node", [authVerify, createOrderRule, createOrderNode]);
orderRouter.post("/cable", [
	authVerify,
	createOrderCableRule,
	createOrderCable,
]);
orderRouter.post("/input", [authVerify, getOrdersRule, getOrders]);
orderRouter.post("/input-node", [authVerify, getOrdersRule, getOrdersNode]);
orderRouter.post("/input-cable", [
	authVerify,
	getOrderCablesRule,
	getOrderCables,
]);

export default orderRouter;
