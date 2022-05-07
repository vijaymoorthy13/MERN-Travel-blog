import  express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import placeRouter from "./routes/places.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(morgan("dev"));
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/users",userRouter);  //http://localhost:5000/users/signup
app.use("/place",placeRouter)
app.get("/", (req, res) => {
  res.send("welcome to Travel api");
})


const port = process.env.PORT || 5000;

mongoose 
  .connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
      app.listen(port,() =>  console.log(`Database connnected server running on port ${port}`));
  })
  .catch((err)=>  console.log(`${err} Database not connected`)); 

  
