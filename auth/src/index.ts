import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

// routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

// middlewares
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/NotFoundError';

const app = express();

dotenv.config();
app.use(express.json());

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
