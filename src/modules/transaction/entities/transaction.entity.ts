import { ETransactionType } from "../enums/transaction-type.enum.js";

export class TransactionEntity {
	id: number;
	accountId: number;
	type: ETransactionType;
	amount: number;
	createdAt: Date;
}