import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts'
dotenv.config();

const app = express();

// middleware, 解析 request body 
// extended： 使用 qs 進行解析，若為 false，則採用 querystring 進行解析，預設為 true
app.use(bodyParser.json({
    limit: "30mb",
    extended: true,
}));

// 用來解析 urlencoded 格式的請求資料。
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
}));

app.use(cors());

app.use('/posts', postRoutes)

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000; 

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false);

