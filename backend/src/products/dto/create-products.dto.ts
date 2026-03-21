import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  connection?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  series?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interface?: string[];

  @IsString()
  @IsOptional()
  power?: string;

  @IsString()
  @IsOptional()
  batteryType?: string;

  @IsString()
  @IsOptional()
  button?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  design?: string;

  @IsNumber()
  categoryId: number;
}
