import { Router, Request, Response } from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';

const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const newUser: IStaffUser = {
      name: req.body.name,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await StaffUser.create<IStaffUser>(newUser);
    res.send(user).status(201);
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
