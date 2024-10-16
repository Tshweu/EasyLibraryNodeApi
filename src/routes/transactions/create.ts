import { Router, Request, Response } from "express";
import { StaffUser } from "../../models/staffUser";
import { ITransaction } from "../../interfaces/ITransaction";
import { User } from "../../models/user";
import { Transaction } from "../../models/transaction";
import { IBook } from "../../interfaces/IBook";
import { Book } from "../../models/book";
import mongoose from "mongoose";

const router: Router = Router();

router.post("", async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });
  try {
    //check if object Ids are valid
    //mongoose.Types.ObjectId.isValid('your id here');

    //check if staff user exists
    const staff = await StaffUser.findById(req.body.user_id).session(session);
    if (!staff) {
      return res.send("staff account not found").status(401);
    }

    //check if library member exists
    const member = await User.findById(req.body.member_id).session(session);
    if (!member) {
      return res.send("member account not found").status(401);
    }
    const books = req.body.books;
    let found_books: IBook[] = [];
    //Loop through books and confirm they exist
    let book_error = false;
    for (let i = 0; i < books.length; i++) {
      const book = await Book.findById(books[i]).session(session);
      //check if book status is checked_out
      console.log(book);
      if (!book) {
        book_error = true;
        break;
      }
      book.status = "checked-out"
      found_books.push(book);
    }

    if (book_error) {
      return res.send("Error finding books").status(404);
    }

    const new_transaction: ITransaction = {
      staff_user_id: req.body.user_id,
      user_id: req.body.member_id,
      status: "borrowed",
      date_returned: "",
      date: new Date().toLocaleDateString(),
      books: found_books,
    };

    const transaction = new Transaction(new_transaction);
    await transaction.save({ session: session });

    //Update book status to checked-out
    //ToDo: Add member that checked out the book to book
    await Book.updateMany(
      { _id: { $in: books } },
      { $set: { status: "checked-out" } }
    );

    await session.commitTransaction();
    res.send(transaction).status(201);
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    res.send(err.message).status(500);
  }
});

export default router;
