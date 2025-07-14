import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.handler';
import userRouter from './router/user.router';
// config
dotenv.config();
const port=process.env.PORT||5000;
const app = express();

app.use(cors(
    {
        credentials: true,
        origin: ["http://localhost:4200"]
    })
);
app.use(express.json());

// router
app.use("/api/user",userRouter);

// middleware
app.use(errorHandler);

// listen
app.listen(port,()=>{
    console.log("http://localhost:"+port);
})