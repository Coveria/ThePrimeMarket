import { ConfigService } from '@nestjs/config';

// Ця утиліта перевіряє, чи працює додаток у режимі розробки, порівнюючи значення NODE_ENV з 'development'.
// Це треба для того, щоб мати можливість змінювати поведінку додатка в залежності від середовища
// (наприклад, використовувати різні бази даних(в майбутньому), cookies).
export const isDev = (configService: ConfigService): boolean =>
  configService.getOrThrow<string>('NODE_ENV') === 'development';
