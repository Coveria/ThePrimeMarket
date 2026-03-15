import { IsNumber, IsPositive, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;
}

export class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
