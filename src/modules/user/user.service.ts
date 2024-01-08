import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity.js';
import { UserRepository } from './repositories/user.repository.js';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.getById(id);
  }

  async updateBalanceById(id: number, amount: number): Promise<UserEntity> {
    return this.userRepository.updateBalanceById(id, amount);
  }
}
