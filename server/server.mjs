import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/database.mjs";
import logger from "./utils/logger.mjs";
import PaymentRoute from "./routes/PaymentRoute.mjs";
import BiddingRoute from "./routes/BiddingRoute.mjs";
import Bidding from "./models/Bidding.mjs";

const app = express();
const PORT = process.env.PORT || "8080";

dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

app.use("/payment", PaymentRoute);
app.use("/bidding", BiddingRoute);

app.listen(PORT, () => {
  logger.info(`Server is up and running on port ${PORT}`);
  databaseConnection();
});
// app.use((req, res, next) => {
//     // Set COOP and COEP headers to loosen security restrictions (for development purposes).
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     next();
//   });

