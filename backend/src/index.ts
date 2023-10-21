import express from 'express';
import register from './routers/Register';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(register)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

