import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email повинен бути рядком' })
  @IsEmail({}, { message: 'Невірний формат email' })
  @IsNotEmpty({ message: 'Email не може бути порожнім' })
  email: string;

  @IsString({ message: 'Пароль повинен бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @MinLength(6, { message: 'Пароль повинен містити щонайменше 6 символів' })
  @MaxLength(128, { message: 'Пароль не повинен перевищувати 128 символів' })
  password: string;

  @IsString({ message: "Ім'я повинно бути рядком" })
  @IsNotEmpty({ message: "Ім'я не може бути порожнім" })
  @MinLength(2, { message: "Ім'я повинно містити щонайменше 2 символи" })
  @MaxLength(15, { message: "Ім'я не повинно перевищувати 15 символів" })
  name: string;
}

export const SafeUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};
