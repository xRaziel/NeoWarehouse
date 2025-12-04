import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryRepository } from 'src/infrastructure/database/repositories/category.repository';
import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/database/entities/category.entity';
import { Product } from 'src/infrastructure/database/entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CategoryRepository,
    ProductRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Product
    ]),
  ],
})
export class ProductModule {}
