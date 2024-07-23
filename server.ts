import app from './src/app';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5100;
const MONGO_URL = process.env.MONGO_URL as string;


try {
  mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => {
      console.log(` connecting to MongoDB Server running on PORT ${PORT}....`);
    });
  }).catch(error => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });
} catch (error) {
  console.error("Unexpected error", error);
  process.exit(1);
}