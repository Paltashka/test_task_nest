import { Module } from '@nestjs/common';
import { AccountService } from './account.service.js';
import { AccountRepository } from './repositories/account.repository.js';
import { UserModule } from '../user/user.module.js';
import { UserService } from '../user/user.service.js';
import { UserRepository } from '../user/repositories/user.repository.js';

@Module({
  imports: [UserModule],
  providers: [AccountService, UserService, AccountRepository, UserRepository],
})
export class AccountModule {}
