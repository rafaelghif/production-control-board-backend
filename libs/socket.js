import { createAdapter } from "@socket.io/cluster-adapter";
import {  setupWorker } from "@socket.io/sticky";
import { Server } from "socket.io";

const socket = async (httpServer) => {
	const io = new Server(httpServer, {
		cors: "*",
		cookie:true
	});

	/**
	 * Production Only
	 *  Comment when on development
	*/ 
	io.adapter(createAdapter());
	setupWorker(io);

	io.use((socket, next) => {
		next();
	});

	io.on("connection", (socket) => {
		socket.on("input", (payload) => {
			io.emit("input", payload);
		});

		socket.on("change-line", async (payload) => {
			console.log(payload);
		});
	});	  
};

export default socket;
