import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Put,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard.js';
import { ReturnBalanceDto } from './dto/return-balance.dto.js';
import { ReturnUserDto } from './dto/return-user.dto.js';
import { UpdateBalanceDto } from './dto/update-finance.dto.js';
import { FinanceService } from './finance.service.js';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

	@UseGuards(AuthGuard)
  @Get('user/:id/balance')
  async getUserAccountBalance(
    @Param('id', new ParseIntPipe()) userId: number,
  ): Promise<ReturnBalanceDto> {
    try {
      return await this.financeService.getAccountBalance(userId);
    } catch (error) {
      throw error;
    }
  }

	@UseGuards(AuthGuard)
  @Put('user/:id/balance')
  async depositFundsToUserAccountBalance(
    @Param('id', new ParseIntPipe()) userId: number,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ): Promise<ReturnUserDto> {
    try {
      return await this.financeService.updateUserAccountBalance(
        userId,
        updateBalanceDto,
        true,
      );
    } catch (error) {
      throw error;
    }
  }

	@UseGuards(AuthGuard)
  @Put('user/:id/balance/withdraw')
  async withdrawFundsFromUserAccountBalance(
    @Param('id', new ParseIntPipe()) userId: number,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ): Promise<ReturnUserDto> {
    try {
      return await this.financeService.updateUserAccountBalance(
        userId,
        updateBalanceDto,
        false,
      );
    } catch (error) {
      throw error;
    }
  }
}
