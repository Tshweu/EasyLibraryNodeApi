import express, { Express, Request, Response } from 'express';
import createBook from './routes/books/create';
import readBook from './routes/books/read';
import updateBook from './routes/books/read';
import deleteBook from './routes/books/read';
import createStaff from './routes/staff_users/create';
import readStaff from './routes/staff_users/read';
import updateStaff from './routes/staff_users/update';
// import deleteStaff from './routes/staff_users/delete';
import createTransaction from './routes/transactions/create';
import readTransaction from './routes/transactions/read';
import updateTransaction from './routes/transactions/update';
import verifyToken from './helpers/token';
import auth from './routes/auth/auth';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/auth',auth);

app.use('/v1/book',verifyToken,createBook);
app.use('/v1/book',verifyToken,readBook);
app.use('/v1/book',verifyToken,updateBook);
app.use('/v1/book',verifyToken,deleteBook);

app.use('/v1/staff',verifyToken,createStaff);
app.use('/v1/staff',verifyToken,readStaff);
app.use('/v1/staff',verifyToken,updateStaff);
// app.use('/v1/staff',verifyToken,deleteStaff);

app.use('/v1/transaction',verifyToken,createTransaction);
app.use('/v1/transaction',verifyToken,readTransaction);
app.use('/v1/transaction',verifyToken,updateTransaction);

export default app;