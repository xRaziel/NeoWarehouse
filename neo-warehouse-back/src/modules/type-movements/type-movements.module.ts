import { Module } from '@nestjs/common';
import { TypeMovementsService } from './type-movements.service';
import { TypeMovementsController } from './type-movements.controller';
import { MovementTypeRepository } from 'src/infrastructure/database/repositories/movementType.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementType } from 'src/infrastructure/database/entities/type-movement.entity';

@Module({
  controllers: [TypeMovementsController],
  providers: [
    TypeMovementsService,
    MovementTypeRepository
  ],
  imports: [
    TypeOrmModule.forFeature([
      MovementType
    ])
  ]
})
export class TypeMovementsModule {}
