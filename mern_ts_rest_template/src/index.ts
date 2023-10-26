import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from "compression"
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})

const MONGO_URL = 'mongodb+srv://yagami:B5WkQI7yVwK63bN9@rshop.hm51ibp.mongodb.net/rest_test?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'))
mongoose.connection.on('error', (err:Error) => console.log(err))

app.use('/', router())