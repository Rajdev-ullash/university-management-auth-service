import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

app.use('/api/v1/users/', UserRoutes);

//global error handler
app.use(globalErrorHandler);
//test route

export default app;
