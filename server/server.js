import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import  path  from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";

dotenv.config();
// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOTURL = process.env.ROOTURL
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

app.use(`${ROOTURL}/auth`,authRouter);



dbConnection(app);


