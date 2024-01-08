import { Injectable } from "@nestjs/common";
import { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import { TransactionDto } from "../dtos/transaction.dto.js";
import { TransactionEntity } from "../entities/transaction.entity.js";

@Injectable()
export class TransationRepository {
	private transactionsTable: Low<TransactionEntity[]>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    this.transactionsTable = await JSONFilePreset<TransactionEntity[]>(
      'transactions.json',
      [],
    );
  }

	async createTransaction(transactionDto: TransactionDto): Promise<TransactionEntity> {
		const transactionId = this.transactionsTable.data.length === 0 ? 0 : this.transactionsTable.data[this.transactionsTable.data.length - 1].id + 1;

		await this.transactionsTable.update(transactions => {
			transactions.push({id: transactionId, createdAt: new Date(), ...transactionDto});
		});

		return this.transactionsTable.data.find(trx => trx.id === transactionId);
	}
}