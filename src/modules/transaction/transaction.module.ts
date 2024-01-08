import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module.js';
import { AccountService } from '../account/account.service.js';
import { AccountRepository } from '../account/repositories/account.repository.js';
import { UserRepository } from '../user/repositories/user.repository.js';
import { UserService } from '../user/user.service.js';
import { TransationRepository } from './repositories/transaction.repository.js';
import { TransactionService } from './transaction.service.js';

@Module({
  imports: [AccountModule],
  providers: [TransactionService, TransationRepository, AccountService, AccountRepository, UserService, UserRepository]
})
export class TransactionModule {}
