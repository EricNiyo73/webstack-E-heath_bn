import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import colors from "colors";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/db.js";
import cors from "cors";
import swaggerDoc from "swagger-ui-express";
import swaggerDocumentation from "./helper/documentation.js";
import AdminRouter from "./routes/AdminRouter.js";
import pharmacyRouter from "./routes/pharmacyDashBoardRouter.js";
import doctorRouter from "./routes/doctorDashBoardRouter.js";
import searchRouter from "./routes/search.js";
import bookingRouter from "./routes/booking.js";
import nurseRouter from "./routes/nurseDashBoardRouter.js";
import clientRouter from "./routes/clientRouter.js";
import hospitalRegister from "./routes/hospitalRegister.js";
import pharmacyRegister from "./routes/pharmcyRegister.js";
import nurseRegister from "./routes/nurseRegister.js";
import doctorRegister from "./routes/doctorRegister.js";
import approved from "./routes/approved.js";
import payments from "./routes/payments.js";
import feedBackRouter from "./routes/contact.js";
import morgan from "morgan";

//start dot.env
dotenv.config();
// connect to db
// connectDb();
//start express app
const app = express();
const { PORT } = process.env;

//start cors
app.use(cors({ origin: true }));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

//router

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Succesfully connected to the database");
  })
  .catch((err) => {
    console.log("something went wrong", err);
    process.exit();
  });
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});

app.use("/api/v1/", AdminRouter);
app.use("/api/v1/", AdminRouter);
app.use("/api/v1/", pharmacyRouter);
app.use("/api/v1/", doctorRouter);
app.use("/api/v1/", searchRouter);
app.use("/api/v1/", bookingRouter);
app.use("/api/v1/", nurseRouter);
app.use("/api/v1/", clientRouter);
app.use("/api/v1/", hospitalRegister);
app.use("/api/v1/", pharmacyRegister);
app.use("/api/v1/", nurseRegister);
app.use("/api/v1/", doctorRegister);
app.use("/api/v1/", approved);
app.use("/api/v1/", payments);
app.use("/api/v1/", feedBackRouter);
//documentation
app.use("/documentation", swaggerDoc.serve);
app.use("/documentation", swaggerDoc.setup(swaggerDocumentation));
app.get("/documentation.json", (req, res) => {
  res.getHeader("Content-Type", "application/json");
  res.send(swaggerDocumentation);
});
app.use(errorHandler);
