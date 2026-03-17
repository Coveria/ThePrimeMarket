import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email повинен бути рядком' })
  @IsEmail({}, { message: 'Невірний формат email' })
  @IsNotEmpty({ message: 'Email не може бути порожнім' })
  email: string;

  @IsString({ message: 'Пароль повинен бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @MinLength(6, { message: 'Пароль повинен містити щонайменше 6 символів' })
  @MaxLength(128, { message: 'Пароль не повинен перевищувати 128 символів' })
  password: string;
}
