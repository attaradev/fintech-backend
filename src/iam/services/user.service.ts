import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: {
    email: string;
    password: string;
    username: string;
  }) {
    await this.validateUserInfo(data);
    const password = await this.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password,
        username: data.username,
      },
    });
  }

  private async userExists(email: string) {
    return !!(await this.getUserByEmail(email));
  }

  private async usernameExists(username: string) {
    return !!(await this.prisma.user.findUnique({ where: { username } }));
  }

  private async hashPassword(password: string) {
    return password;
  }

  private async validateUserInfo(data: { email: string; username: string }) {
    if (await this.userExists(data.email)) {
      throw new Error('User with this email already exists');
    }

    if (await this.usernameExists(data.username)) {
      throw new Error('User with this username already exists');
    }
  }
}
