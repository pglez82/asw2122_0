import express, { Application } from "express";
import cors from 'cors';
import bp from 'body-parser';
import api from "./api"; 

const app: Application = express();
const port = 5000;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

app.use(cors(options));
app.use(bp.json());

app.use("/api", api)

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}

