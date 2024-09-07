import { Router, Request, Response } from 'express';
import { ITransaction } from '../../interfaces/ITransaction';
import { Transaction } from '../../models/transaction';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find<ITransaction>();
    res.send(transactions).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById<ITransaction>(id);
    res.send(transaction).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
