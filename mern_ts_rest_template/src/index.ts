import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from "compression"
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';

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

const MONGO_URL = 'mongodb+srv://trisera12345:KfwyaxStm2iUPN0x@rshop.hm51ibp.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (err:Error) => console.log(err))