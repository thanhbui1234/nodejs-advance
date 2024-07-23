import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import router from './routers/';
import errorHandlerMiddleware from './middleware/errors.middleware';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('', router)

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});


app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

app.use(errorHandlerMiddleware);

export default app;
