import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/', routes);

//global error handler
app.use(globalErrorHandler);
//test route

export default app;
