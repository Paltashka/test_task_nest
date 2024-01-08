import { TransactionEntity } from "../../transaction/entities/transaction.entity.js";

export class AccountEntity {
  id: number;
  userId: number;
  balance: number;
	transactions: TransactionEntity[];
}
