import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../transaction/entities/transaction.entity.js';
import { UserService } from '../user/user.service.js';
import { AccountEntity } from './entities/account.entity.js';
import { AccountRepository } from './repositories/account.repository.js';

@Injectable()
export class AccountService {
  constructor(
    private readonly userService: UserService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async getBalanceById(accountId: number): Promise<number> {
    return this.accountRepository.getBalanceById(accountId);
  }

  async updateBalanceById(
    accountId: number,
    amount: number,
  ): Promise<AccountEntity> {
    return this.accountRepository.updateBalanceById(accountId, amount);
  }

	async addTransactionForAccount(accountId: number, transaction: TransactionEntity): Promise<AccountEntity> {
		return this.accountRepository.addTransactionForAccount(accountId, transaction);
	}
	
}
