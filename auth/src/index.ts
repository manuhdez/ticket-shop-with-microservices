import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
