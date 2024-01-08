import { AccountEntity } from '../../account/entities/account.entity.js';

export class UserEntity {
  id: number;
  username: string;
  email: string;

  account: AccountEntity;
}
