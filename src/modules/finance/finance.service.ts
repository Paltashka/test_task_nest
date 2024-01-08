import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service.js';
import { ETransactionType } from '../transaction/enums/transaction-type.enum.js';
import { TransactionService } from '../transaction/transaction.service.js';
import { UserService } from '../user/user.service.js';
import { ReturnBalanceDto } from './dto/return-balance.dto.js';
import { ReturnUserDto } from './dto/return-user.dto.js';
import { UpdateBalanceDto } from './dto/update-finance.dto.js';

@Injectable()
export class FinanceService {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
		private readonly transactionService: TransactionService
  ) {}

  async getAccountBalance(userId: number): Promise<ReturnBalanceDto> {
    const user = await this.userService.getUserById(userId);

    const userBalance = await this.accountService.getBalanceById(user.account.id);

		const transaction = await this.transactionService.createTransaction(
			{
				accountId: user.account.id, 
				type: ETransactionType.BALANCE, 
				amount: userBalance
			});

		return ReturnBalanceDto.toBalanceDto(userBalance);
  }

  async updateUserAccountBalance(
    userId: number,
    updateBalanceDto: UpdateBalanceDto,
    isDepositFunds: boolean,
  ): Promise<ReturnUserDto> {
		const user = await this.userService.getUserById(userId);
		
		if(!isDepositFunds && user.account.balance < updateBalanceDto.amount){
			throw new BadRequestException('Insufficient funds');
		}

    const updatedUser = await this.userService.updateBalanceById(
      userId,
      !isDepositFunds ? -updateBalanceDto.amount : updateBalanceDto.amount,
    );

    // Because we are mocking database and using ORM we could only update the Account table
    // and User table would have updated version of account with foreign key, but were are using simple json
    // so we need to update both Account and User table
    await this.accountService.updateBalanceById(
      updatedUser.account.id,
      !isDepositFunds ? -updateBalanceDto.amount : updateBalanceDto.amount,
    );

		const transaction = await this.transactionService.createTransaction(
			{
				accountId: user.account.id, 
				type: isDepositFunds ? ETransactionType.DEPOSIT : ETransactionType.WITHDRAWAL, 
				amount: updateBalanceDto.amount
			});

    return ReturnUserDto.fromUserEntity(updatedUser);
  }
}
