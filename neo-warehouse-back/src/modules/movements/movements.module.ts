import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { MovementRepository } from 'src/infrastructure/database/repositories/movement.repository';
import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { MovementTypeRepository } from 'src/infrastructure/database/repositories/movementType.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/infrastructure/database/entities/product.entity';
import { Movement } from 'src/infrastructure/database/entities/movement.entity';
import { MovementType } from 'src/infrastructure/database/entities/type-movement.entity';

@Module({
  controllers: [MovementsController],
  providers: [
    MovementsService,
    MovementRepository,
    ProductRepository,
    MovementTypeRepository
  ],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Movement,
      MovementType
    ])
  ]
})
export class MovementsModule {}
