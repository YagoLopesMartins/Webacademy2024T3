import express from "express";
import {Request, Response} from "express";
import validateEnv from "./src/utils/validateEnv";
import dotenv from "dotenv";
import { engine } from 'express-handlebars';
const path = require('path')
import router from './src/routes/router';

const app = express();
app.use(router);

// dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
validateEnv();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.engine("handlebars", engine({
  helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.statusCode = 404;
  res.send("404!");
})

app.listen(PORT, ()=>{
    console.log(`Express app iniciada na porta ${PORT}. :)`)
})