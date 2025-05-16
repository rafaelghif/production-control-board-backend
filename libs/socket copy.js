import { createAdapter } from "@socket.io/cluster-adapter";
import {  setupWorker } from "@socket.io/sticky";
import { createClient } from "redis";
import { Server } from "socket.io";

const socket = async (httpServer) => {
	const io = new Server(httpServer, {
		cors: "*",
	});

	/**
	 * Production Only
	 *  Comment when on development
	*/ 

	io.adapter(createAdapter(pubClient, subClient));
	setupWorker(io);

	io.use((socket, next) => {
		next();
	});

	io.on("connection", (socket) => {
		socket.on("input", (payload) => {
			console.log(`Broadcast to ${payload?.LineId}`);
			io.to(payload?.LineId).emit("input", "input");
		});

		socket.on("change-line", async (payload) => {
			const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
			for (const room of rooms) {
				await socket.leave(room);
			}

			const lineId = payload?.LineId;
			if (!lineId) {
				console.warn("Invalid payload on change-line:", payload);
				return;
			}

			console.log(`Join ${lineId}`);
			await socket.join(lineId);
		});
	});	  
};

export default socket;
