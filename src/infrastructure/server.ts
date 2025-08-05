import express from 'express';
import router from '../adapters/http/clientController';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
