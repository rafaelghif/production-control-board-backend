import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
// import * as fs from "fs";
import helmet from "helmet";
import * as http from "http";
// import { createServer } from "https";
import morgan from "morgan";
import path, { dirname } from "path";
import { createStream } from "rotating-file-stream";
import { fileURLToPath } from "url";

import socket from "./libs/socket.js";
import "./models/index.js";
import router from "./routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const certificate = fs.readFileSync("ssl/server.crt");
// const privateKey = fs.readFileSync("ssl/server.key");

// const credentialOptions = {
// 	key: privateKey,
// 	cert: certificate,
// };

const app = express();

const accessLogStream = createStream("access.log", {
	interval: "1d",
	path: path.join(__dirname, "logs", "access"),
});

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 70,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// const httpsServer = createServer(credentialOptions, app);

const httpsServer = http.createServer(app);

socket(httpsServer);

const PORT = process.env.APP_PORT ?? 8081;

app.use("/api", router);

httpsServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
