import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 30)
  readonly password: string;
}
