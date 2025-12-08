import { Injectable } from '@nestjs/common';
import { MovementTypeRepository } from 'src/infrastructure/database/repositories/movementType.repository';

@Injectable()
export class TypeMovementsService {

    constructor(
        private readonly movementTypeRepository: MovementTypeRepository
    ) { }

    async getAllTypeMovements() {
        return await this.movementTypeRepository.obtainAllMovementTypes();
    }
}
