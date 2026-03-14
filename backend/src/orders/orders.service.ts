import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createFromCart(userId: number) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });

    return order;
  }

  findAllByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(orderId: number, userId?: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) throw new NotFoundException(`Order ${orderId} not found`);

    if (userId && order.userId !== userId) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(orderId: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
      include: { items: { include: { product: true } } },
    });
  }
}
