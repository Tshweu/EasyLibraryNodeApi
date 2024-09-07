import { Router, Request, Response} from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';
import { ITransaction } from '../../interfaces/ITransaction';
import mongoose from 'mongoose';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const transaction : ITransaction = {
            staff_user_id: new mongoose.Schema.ObjectId(''),
            user_id: new mongoose.Schema.ObjectId(''),
            status: '',
            penalties: [],
            condition: '',
            date_returned: '',
            date: '',
            books: []
        }
        let updatedTransaction = await StaffUser.findByIdAndUpdate<IStaffUser>(id,transaction,{new: true});
        res.send(updatedTransaction).status(200);
    } catch (err) {
        res.send(err.message).status(500);
    }
})

export default router;