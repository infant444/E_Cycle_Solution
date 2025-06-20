import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
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


// middleware


// listen
app.listen(port,()=>{
    console.log("http://localhost:"+port);
})