import express, { Express, Request, Response } from 'express';
import createBook from './routes/books/create';
import readBook from './routes/books/read';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/book',createBook);
app.use('/v1/book',readBook);


export default app;