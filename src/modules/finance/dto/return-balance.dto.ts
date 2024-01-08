
export class ReturnBalanceDto {
	balance: number;

	static toBalanceDto(balance: number): ReturnBalanceDto {
		const returnBalanceDto = new ReturnBalanceDto();

		returnBalanceDto.balance = balance;

		return returnBalanceDto;
	}
}