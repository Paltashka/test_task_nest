import { AccountEntity } from '../modules/account/entities/account.entity.js';
import { UserEntity } from '../modules/user/entities/user.entity.js';

export const initialUserAccount: AccountEntity = {
  id: 1,
  userId: 1,
  balance: 0,
	transactions: []
};

export const initialUser: UserEntity = {
  id: 1,
  username: 'random_user',
  email: 'random_user@gmail.com',
  account: initialUserAccount,
};
