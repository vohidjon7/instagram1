import express from 'express';
import dot from 'dotenv';
import mongoose from 'mongoose';
import formidable from 'express-formidable';
import cors from 'cors';
import morgan from 'morgan'
import route from './routes/routes.js';
const app = express();


//app use
dot.config();
app.use(express.json());
app.use(formidable());
app.use(cors());
app.use(morgan("dev"))
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
    console.log("db");
});

app.use('/', route)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('hello');
})