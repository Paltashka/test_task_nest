import { ETransactionType } from "../enums/transaction-type.enum.js";

export class TransactionDto {
	accountId: number;
	type: ETransactionType;
	amount: number;
}