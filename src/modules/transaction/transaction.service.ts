import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service.js';
import { TransactionDto } from './dtos/transaction.dto.js';
import { TransactionEntity } from './entities/transaction.entity.js';
import { TransationRepository } from './repositories/transaction.repository.js';

@Injectable()
export class TransactionService {

	constructor(private readonly transactionRepository: TransationRepository,
							private readonly accountService: AccountService){}

	async createTransaction(transation: TransactionDto): Promise<TransactionEntity> {
		const transaction = await this.transactionRepository.createTransaction(transation);

		await this.accountService.addTransactionForAccount(transaction.accountId, transaction);

		return transaction;
	}
}
