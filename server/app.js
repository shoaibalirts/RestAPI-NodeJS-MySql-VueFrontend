import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
///////// For chat
import { createServer } from "http";
import { Server } from "socket.io";
///////////

// import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  signin,
  createUser,
} from "../server/controllers/dinProdukter.js";
// import logger from "../server/middleware/logger.js";
// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/config.env" });

const app = express();

// For chat merging two servers
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // io is the server from socket.io
  cors: {
    origin: "http://localhost:5173",
    credential: true,
  },
});
io.on("connect", (socket) => {
  console.log(`A new user connected: ${socket.id}`);
  // Example of a chat event listener
  // socket.on("sendMessage", (messageData) => {
  //   // 1. Save messageData to MySQL (e.g., using a controller function)
  //   // 2. Broadcast the message to all other connected clients
  //   io.emit("receiveMessage", "messageData to soufian");
  // });
  socket.emit("messageFromServer", {
    msg: "Hello from the nodejs server",
    id: socket.id,
  });
  socket.on("messageFromClient", (message) => {
    console.log("Message from client: ", message.msg);
  });
  socket.on("disconnect", () => {
    console.log(`The user disconnected who had id: ${socket.id}`);
  });
});
/* 
middleware - created a separate file called logger.js in middleware folder
const logger = (req, res, next) => {
  req.authenticationToken =
    "Go the user table database and check if user exists. If exists, then assign the user a token. This token is available to whole of the API for performing CRUD operation. We console log this variable in dinProdukter.js API file to see and it worked";
  console.log("Middleware ran");
  console.log(
    `${req.method} ${req.protocol}: //${req.get("host")} abc ${req.originalUrl}`
  );

  next();
};
// app.use(logger);

*/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Body Parser, already available in express
app.use(express.json());

const port = process.env.PORT || 3000;
const router = express.Router();
router.route("/signin").post(signin);
router.route("/signup").post(createUser);

// verify jwt token
app.use(cookieParser());

const authenticateToken = (req, res, next) => {
  // exclude login and sign up routes from jwt validation

  if (req.path.includes("signin") || req.path.includes("signup")) return next();

  const token = req.cookies.token;
  if (!token) return res.status(401).json("No token was provided.");

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json("Invalid token.");
  }
};

app.use("/api/dinprodukter", authenticateToken);

router.route("/").get(getAllProducts).post(createProduct);
router.route("/createproduct").post(createProduct);

router
  .route("/:prodId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

app.use("/api/dinprodukter", router);
app.set("view engine", ".hbs");
app.set("views", "../server/views");
httpServer.listen(process.env.PORT, () =>
  console.log(
    `Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
