import express from "express";
import register from "./routers/Register";
import login from "./routers/Login";
import updateuser from "./routers/UpdateUser";
import deleteuser from "./routers/DeleteUser";
import getusers from "./routers/GetUsers";
import bodyParser from "body-parser";
import makeuseradmin from "./routers/MakeUserAdmin";
import "./config";
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(register);
app.use(login);
app.use(updateuser);
app.use(deleteuser);
app.use(getusers);
app.use(makeuseradmin)

