import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import type { JwtPayload } from './interfaces/jwt.interface';
import { isDev } from 'src/utils/is-dev.utils';
import type { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN: JwtSignOptions['expiresIn'];
  private readonly JWT_REFRESH_TOKEN: JwtSignOptions['expiresIn'];
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN =
      this.configService.getOrThrow<JwtSignOptions['expiresIn']>(
        'JWT_ACCESS_TOKEN',
      );
    this.JWT_REFRESH_TOKEN =
      this.configService.getOrThrow<JwtSignOptions['expiresIn']>(
        'JWT_REFRESH_TOKEN',
      );
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async login(res: Response, dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Невірний email або пароль');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Невірний email або пароль');

    return this.auth(res, user.id);
  }

  async register(res: Response, dto: CreateUserDto) {
    const existingUser = await this.usersService.existsByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Користувач з таким email вже існує');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken: unknown = req.cookies?.refreshToken;

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new UnauthorizedException('Відсутній або не дійсний refresh token');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException(
        'Невірний або прострочений refresh token',
      );
    }
    // Якщо токен валідний, отримуємо користувача з бази даних по id з токену
    const user = await this.usersService.findById(payload.id);
    if (!user) throw new UnauthorizedException('Користувач не знайдений');

    return this.auth(res, user.id);
  }

  logout(res: Response) {
    this.setCookie(res, '', new Date(0)); // Встановлюємо порожній refreshToken, щоб видалити його з кукі
    return true;
  }

  async validateUser(id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UnauthorizedException('Користувач не знайдений');
    }
    return user;
  }

  private auth(res: Response, id: number) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ); // 7 днів

    return { accessToken };
  }

  private generateTokens(id: number) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService), // Встановлюємо secure тільки в продакшені(https),
      // в локальній розробці (http) автоматично дозволяємо доступ cookie до localhost
      sameSite: isDev(this.configService) ? 'lax' : 'strict',
    });
  }
}
