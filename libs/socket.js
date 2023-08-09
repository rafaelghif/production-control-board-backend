import { Server } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const socket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: "*"
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
}

export default socket;