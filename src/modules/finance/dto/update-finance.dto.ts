import { IsPositive } from 'class-validator';

export class UpdateBalanceDto {
  @IsPositive()
  amount: number;
}
