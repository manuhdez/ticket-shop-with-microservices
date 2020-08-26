import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

// routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

// middlewares
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/NotFoundError';

const app = express();

app.set('trust proxy', true);

dotenv.config();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// route registry
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Database successfully conected.');
  } catch (e) {
    console.log(e);
  }

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start();
