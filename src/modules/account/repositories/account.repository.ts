import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';
import { initialUserAccount } from '../../../constants/database.constants.js';
import { TransactionEntity } from '../../transaction/entities/transaction.entity.js';
import { AccountEntity } from '../entities/account.entity.js';

@Injectable()
export class AccountRepository {
  private accountsTable: Low<AccountEntity[]>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    this.accountsTable = await JSONFilePreset<AccountEntity[]>(
      'accounts.json',
      [initialUserAccount],
    );
  }

  async getBalanceById(accountId: number): Promise<number> {
    return this.accountsTable.data.find((account) => account.id === accountId)
      .balance;
  }

  async updateBalanceById(id: number, amount: number): Promise<AccountEntity> {
    await this.accountsTable.update((accounts) => {
      const accountToUpdateIndex = accounts.findIndex(
        (account) => account.id === id,
      );

      accounts[accountToUpdateIndex] = {
        ...accounts[accountToUpdateIndex],
        balance: accounts[accountToUpdateIndex].balance + amount,
      };
    });

    return this.accountsTable.data.find((account) => account.id === id);
  }

	async addTransactionForAccount(accountId: number, transaction: TransactionEntity): Promise<AccountEntity> {
		await this.accountsTable.update(accounts => {
			const accountIndex = accounts.findIndex(account => account.id === accountId);

			accounts[accountIndex] = {...accounts[accountIndex], transactions: [...accounts[accountIndex].transactions, transaction]}
		});

		return this.accountsTable.data.find(account => account.id === accountId);
	}
}
