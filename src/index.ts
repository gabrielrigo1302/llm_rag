import { configDotenvAdapter } from "./adapters/functions";
import { routes } from './routes';
import express from 'express';

configDotenvAdapter();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.HTTP_PORT, () => `servidor rodando na porta ${process.env.HTTP_PORT}`)