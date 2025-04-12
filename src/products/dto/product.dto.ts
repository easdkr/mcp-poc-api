/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ description: '상품 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '상품명', example: 'Smartphone X' })
  name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'Latest smartphone with advanced features',
  })
  description: string;

  @ApiProperty({ description: '가격', example: 1000 })
  price: number;

  @ApiProperty({ description: '재고 수량', example: 50 })
  stockQuantity: number;

  @ApiPropertyOptional({
    description: '이미지 URL',
    example: 'http://example.com/image.jpg',
  })
  imageUrl?: string;

  @ApiProperty({ description: '생성일', type: Date })
  createdAt: Date;

  @ApiProperty({ description: '수정일', type: Date })
  updatedAt: Date;
}

export class CreateProductDto {
  @ApiProperty({ description: '상품명', example: 'Smartphone X' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'Latest smartphone with advanced features',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: '가격', example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: '재고 수량', example: 50 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @ApiPropertyOptional({
    description: '이미지 URL',
    example: 'http://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class ProductListDto {
  @ApiProperty({ description: '상품 목록', type: [ProductDto] })
  items: ProductDto[];

  @ApiProperty({ description: '전체 상품 수', example: 10 })
  total: number;

  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 상품 수', example: 10 })
  limit: number;
}

export class ProductFilterDto {
  @ApiPropertyOptional({ description: '페이지 번호', default: 1, example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: '페이지당 항목 수',
    default: 10,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: '검색어', example: 'phone' })
  @IsOptional()
  @IsString()
  search?: string;
}
