export class Wallet {
  constructor(
    public readonly id: string,
    public readonly balance: number,
    public readonly userId: string,
  ) {}
}
