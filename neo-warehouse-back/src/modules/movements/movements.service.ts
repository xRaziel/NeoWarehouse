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
    try {
      const product = await this.productRepository.findProductById(createMovementDto.producto_id);
      if (!product) {
        throw new Error(`Product with SKU "${createMovementDto.producto_id}" not found`);
      }
      const tipoMovimiento = await this.movementTypeRepository.findMovementTypeById(createMovementDto.tipo_movimiento_id);

      if (!tipoMovimiento) {
        throw new Error(`Movement type "${createMovementDto.tipo_movimiento_id}" not found`);
      }

      if (tipoMovimiento.tipo === 'Entrada') {
        product.stock += createMovementDto.cantidad ?? 0;
      } else if (tipoMovimiento.tipo === 'Salida') {
        if (product.stock < (createMovementDto.cantidad ?? 0)) {
          throw new Error(`Insufficient stock for product with SKU "${createMovementDto.producto_id}"`);
        }
        product.stock -= createMovementDto.cantidad ?? 0;
      } else if (tipoMovimiento.tipo === 'Ajuste') {
        product.stock = createMovementDto.cantidad ?? product.stock;
      }
      else {
        throw new Error(`Invalid movement type "${tipoMovimiento.tipo}"`);
      }

      await this.productRepository.updateProduct(product);

      const movement : Movement = new Movement();
      movement.producto = product;
      movement.cantidad = createMovementDto.cantidad ?? -1;
      movement.fecha = createMovementDto.fecha;
      movement.nota = createMovementDto.nota || '';
      movement.tipoMovimiento = tipoMovimiento;
      movement.user = createMovementDto.user;
      return this.movementRepository.createMovement(movement);
    } catch (error) {
      throw error;
    }
  }
}
