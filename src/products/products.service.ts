import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  ProductFilterDto,
  ProductListDto,
} from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    private readonly em: EntityManager,
  ) {}

  async findAll(filter: ProductFilterDto): Promise<ProductListDto> {
    const { page = 1, limit = 10, search } = filter;
    const queryOptions: FilterQuery<Product> = {};

    if (search) {
      queryOptions.name = { $like: `%${search}%` };
    }

    const [items, total] = await this.productRepository.findAndCount(
      queryOptions,
      {
        limit,
        offset: (page - 1) * limit,
      },
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      items: items.map(this.mapToDto.bind(this)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return this.mapToDto(product);
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const product = new Product(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stockQuantity,
      createProductDto.imageUrl,
    );

    await this.productRepository.insert(product);
    return this.mapToDto(product);
  }

  private mapToDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
