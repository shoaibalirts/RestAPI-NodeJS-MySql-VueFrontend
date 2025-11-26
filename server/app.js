import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

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
} from "../server/controllers/dinProdukter.js";
import logger from "../server/middleware/logger.js";
// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/config.env" });

const app = express();
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

app.use(cors());
// Body Parser, already available in express
app.use(express.json());

const port = process.env.PORT || 3000;
const router = express.Router();
router.route("/").get(getAllProducts).post(createProduct);
router.route("/createproduct").post(createProduct);
router.route("/signin").post(signin);

router
  .route("/:prodId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

app.use("/api/dinprodukter", router);
app.set("view engine", ".hbs");
app.set("views", "../server/views");
app.listen(process.env.PORT, () =>
  console.log(
    `Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
