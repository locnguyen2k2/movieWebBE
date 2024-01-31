import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './routes/webRoute.js';
import initAPIRoutes from './routes/apiRoute.js';

const app = express();
dotenv.config();
const port = process.env.PORT;
let redisClient = createClient();
redisClient.connect().catch(err => {
    console.log(err);
});
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        httpOnly: true,
        secure: false,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
    })
);
app.use(cookieParser());
app.use(
    session({
        store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
        resave: false,
        saveUninitialized: false,
        secret: "keyboard cat",

    })
);
configViewEngine(app);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap/css', express.static(path.join(__dirname, './../node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.join(__dirname, './../node_modules/bootstrap/dist/js')))
initAPIRoutes(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
