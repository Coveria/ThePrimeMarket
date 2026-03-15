import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async addItem(userId: number, dto: AddToCartDto) {
    const existing = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: dto.productId } },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { userId_productId: { userId, productId: dto.productId } },
        data: { quantity: existing.quantity + (dto.quantity ?? 1) },
        include: { product: true },
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, productId: dto.productId, quantity: dto.quantity ?? 1 },
      include: { product: true },
    });
  }

  async updateItem(userId: number, productId: number, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: dto.quantity },
      include: { product: true },
    });
  }

  async removeItem(userId: number, productId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  }

  clear(userId: number) {
    return this.prisma.cartItem.deleteMany({ where: { userId } });
  }
}
