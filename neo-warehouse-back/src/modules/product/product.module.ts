import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryRepository } from 'src/infrastructure/database/repositories/category.repository';
import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/database/entities/category.entity';
import { Product } from 'src/infrastructure/database/entities/product.entity';
import { MovementsModule } from '../movements/movements.module';
import { MovementRepository } from 'src/infrastructure/database/repositories/movement.repository';
import { MovementTypeRepository } from 'src/infrastructure/database/repositories/movementType.repository';
import { Movement } from 'src/infrastructure/database/entities/movement.entity';
import { MovementType } from 'src/infrastructure/database/entities/type-movement.entity';
import { MovementsService } from '../movements/movements.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CategoryRepository,
    ProductRepository,
    MovementRepository,
    MovementTypeRepository,
    MovementsService
  ],
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Product,
      Movement,
      MovementType
    ]),
    MovementsModule
  ],
})
export class ProductModule {}
