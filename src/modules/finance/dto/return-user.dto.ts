import { UserEntity } from '../../user/entities/user.entity.js';

export class ReturnUserDto {
  id: number;
  username: string;
  email: string;
  balance: number;

  static fromUserEntity(user: UserEntity): ReturnUserDto {
    const returnUserDto = new ReturnUserDto();

    returnUserDto.id = user.id;
    returnUserDto.username = user.username;
    returnUserDto.email = user.email;
    returnUserDto.balance = user.account.balance;

    return returnUserDto;
  }
}
