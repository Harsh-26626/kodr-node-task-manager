import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/AuthRouter.js';
import TasksRouter from './routes/TasksRouter.js'
import corsOptions from './config/CORSConfig.js';
import connectToDB from './config/DBConfig.js';
import { config } from 'dotenv'

config();

const PORT = process.env.PORT;

const app = express();

await connectToDB();

app.use(express());

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/auth', AuthRouter);

app.use('/tasks', TasksRouter);

app.use('/', (req, res) => (res.send('lalalalaa')));

app.listen(PORT, () => console.log("Welcome to TaskNest!\n\nAPI created, managed by Harsh Ahuja"));