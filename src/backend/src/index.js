import express from 'express';
import 'dotenv/config';
import { authRouter } from './routes/auth.route.js';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());

app.use(authRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port:${PORT}`);
});
