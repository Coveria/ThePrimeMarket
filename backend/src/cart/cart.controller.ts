import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import * as rolesDto from 'src/auth/dto/roles-dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll(@CurrentUser() user: rolesDto.AuthenticatedUserDto) {
    return this.cartService.findAll(user.id);
  }

  @Post()
  addItem(
    @CurrentUser() user: rolesDto.AuthenticatedUserDto,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addItem(user.id, dto);
  }

  @Put(':productId')
  updateItem(
    @CurrentUser() user: rolesDto.AuthenticatedUserDto,
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.id, +productId, dto);
  }

  @Delete('clear')
  clear(@CurrentUser() user: rolesDto.AuthenticatedUserDto) {
    return this.cartService.clear(user.id);
  }

  @Delete(':productId')
  removeItem(
    @CurrentUser() user: rolesDto.AuthenticatedUserDto,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItem(user.id, +productId);
  }
}
