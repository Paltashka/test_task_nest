import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module.js';
import { AccountService } from '../account/account.service.js';
import { AccountRepository } from '../account/repositories/account.repository.js';
import { TransationRepository } from '../transaction/repositories/transaction.repository.js';
import { TransactionModule } from '../transaction/transaction.module.js';
import { TransactionService } from '../transaction/transaction.service.js';
import { UserRepository } from '../user/repositories/user.repository.js';
import { UserModule } from '../user/user.module.js';
import { UserService } from '../user/user.service.js';
import { FinanceController } from './finance.controller.js';
import { FinanceService } from './finance.service.js';

@Module({
  imports: [AccountModule, UserModule, TransactionModule],
  controllers: [FinanceController],
  providers: [FinanceService, AccountService, UserService, AccountRepository, UserRepository, TransactionService, TransationRepository],
})
export class FinanceModule {}
