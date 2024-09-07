import { Router, Request, Response } from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';
import { ITransaction } from '../../interfaces/ITransaction';
import mongoose from 'mongoose';

const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    //check if library member exists
    //check if staff user exists
    //check if books exist
    const new_transaction : ITransaction = {
        staff_user_id: new mongoose.Schema.ObjectId(''),
        user_id: new mongoose.Schema.ObjectId(''),
        status: '',
        penalties: [],
        condition: '',
        date_returned: '',
        date: '',
        books: []
    };
    const transaction = await StaffUser.create<ITransaction>(new_transaction);
    res.send(transaction).status(201);
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
