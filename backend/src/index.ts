import express from "express";
import register from "./routers/Register";
import login from "./routers/Login";
import updateuser from "./routers/UpdateUser";
import deleteuser from "./routers/DeleteUser";
import bodyParser from "body-parser";
import "./config";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(register);
app.use(login);
app.use(updateuser);
app.use(deleteuser);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
