import { Server } from "socket.io";

const socket = (httpServer) => {
	const io = new Server(httpServer, {
		cors: "*",
	});

	io.use((socket, next) => {
		next();
	});

	io.on("connection", (socket) => {
		console.log({ socketId: socket.id });
		socket.on("input", () => {
			io.emit("input", "input");
		});
	});
};

export default socket;
