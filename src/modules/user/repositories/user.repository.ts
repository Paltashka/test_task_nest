import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { UserEntity } from '../entities/user.entity.js';
import { JSONFilePreset } from 'lowdb/node';
import { initialUser } from '../../../constants/database.constants.js';

@Injectable()
export class UserRepository {
  private usersTable: Low<UserEntity[]>;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    this.usersTable = await JSONFilePreset<UserEntity[]>('users.json', [
      initialUser,
    ]);
  }

  async getById(id: number): Promise<UserEntity> {
    return this.usersTable.data.find((user) => user.id === id);
  }

  async updateBalanceById(id: number, amount: number): Promise<UserEntity> {
    await this.usersTable.update((users) => {
      const userToUpdateIndex = users.findIndex((user) => user.id === id);
      const userToUpdate = users[userToUpdateIndex];

      users[userToUpdateIndex] = {
        ...userToUpdate,
        account: {
          ...userToUpdate.account,
          balance: userToUpdate.account.balance + amount,
        },
      };

      return users;
    });

    return this.usersTable.data.find((user) => user.id === id);
  }
}
