/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  ProductFilterDto,
  ProductDto,
  ProductListDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '상품 목록 조회' })
  @ApiOkResponse({ description: '상품 목록 조회 성공', type: ProductListDto })
  @ApiQuery({ name: 'page', required: false, description: '페이지 번호' })
  @ApiQuery({ name: 'limit', required: false, description: '페이지당 항목 수' })
  @ApiQuery({ name: 'search', required: false, description: '검색어' })
  async findAll(@Query() filter: ProductFilterDto): Promise<ProductListDto> {
    return this.productsService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: '상품 상세 조회' })
  @ApiOkResponse({ description: '상품 상세 조회 성공', type: ProductDto })
  @ApiParam({ name: 'id', description: '상품 ID' })
  async findOne(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '상품 생성' })
  @ApiCreatedResponse({ description: '상품 생성 성공', type: ProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }
}
