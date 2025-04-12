import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ormOptions } from '../mikro-orm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MikroOrmModule.forRoot(ormOptions), ProductsModule],
})
export class AppModule {}
