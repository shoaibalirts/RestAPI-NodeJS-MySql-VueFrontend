import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import requireDebugCookie from "../server/middleware/requireDebugCookie.js";
import authenticateToken from "../server/middleware/authenticateToken.js";

///////// For chat
import { createServer } from "http";
import { Server } from "socket.io";
///////////

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
// Body Parser, already available in express
app.use(express.json());

const port = process.env.PORT || 3000;
const router = express.Router();
router.route("/signin").post(authenticateToken, signin);
router.route("/signup").post(createUser);

app.use("/api/dinprodukter", authenticateToken);

router.route("/products").get(requireDebugCookie, getAllProducts);
router
  .route("/")
  .get(getAllProducts) // reading all products from MySql product table
  .post(createProduct);
router.route("/createproduct").post(createProduct); // creating a new product by loggedin user

router
  .route("/:prodId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

app.use("/api/dinprodukter", router);
// app.set("view engine", ".hbs");
// app.set("views", "../server/views");
httpServer.listen(process.env.PORT, () =>
  console.log(
    `Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
