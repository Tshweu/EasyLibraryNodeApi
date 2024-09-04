import mongoose from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";
import { Book } from "./book";
import { Penalty } from "./penalty";

const transactionSchema = new mongoose.Schema<ITransaction>({
  staff_user_id: { type: mongoose.Schema.ObjectId, required: true },
  user_id: { type: mongoose.Schema.ObjectId, required: true },
  status: { type: String, required: true },
  penalties: [Penalty],
  condition: { type: String, required: true },
  date_returned: { type: String },
  date: { type: String, required: true },
  books: [Book],
});
