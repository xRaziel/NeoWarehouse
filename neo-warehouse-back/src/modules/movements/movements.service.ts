import { Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { MovementRepository } from 'src/infrastructure/database/repositories/movement.repository';
import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { Movement } from 'src/infrastructure/database/entities/movement.entity';
import { MovementType } from 'src/infrastructure/database/entities/type-movement.entity';
import { MovementTypeRepository } from 'src/infrastructure/database/repositories/movementType.repository';

@Injectable()
export class MovementsService {
  
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly productRepository: ProductRepository,
    private readonly movementTypeRepository: MovementTypeRepository
  ) {}

  async getAllMovements() {
    return await this.movementRepository.obtainAllMovements();
  }

  async createMovement(createMovementDto: CreateMovementDto) {
    const product = await this.productRepository.findProductById(createMovementDto.productId);
    if (!product) {
      throw new Error(`Product with SKU "${createMovementDto.productId}" not found`);
    }
    const tipoMovimiento = await this.movementTypeRepository.findMovementTypeByName(createMovementDto.type);

    if (!tipoMovimiento) {
      throw new Error(`Movement type "${createMovementDto.type}" not found`);
    }

    const movement : Movement = new Movement();
    movement.producto = product;
    movement.cantidad = createMovementDto.quantity;
    movement.fecha = createMovementDto.date;
    movement.nota = createMovementDto.note || '';
    movement.tipoMovimiento = tipoMovimiento;
    return this.movementRepository.createMovement(movement);
  }
}
