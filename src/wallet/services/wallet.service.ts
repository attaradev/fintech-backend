import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  private async findWalletById(id: string) {
    return this.prisma.wallet.findUnique({
      where: { id },
    });
  }
}
