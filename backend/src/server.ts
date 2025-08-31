import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.handler';
import userRouter from './router/user.router';
import tableRouter from './router/table.router';
import clientRouter from './router/client.router';
import projectRouter from './router/project.router';
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

// router   http://localhost:5000/api/client/addClient
app.use("/api/table",tableRouter);
app.use("/api/client",clientRouter);
app.use("/api/user",userRouter);
app.use("/api/project",projectRouter);

// middleware
app.use(errorHandler);

// listen
app.listen(port,()=>{
    console.log("http://localhost:"+port);
})