import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movement } from "../entities/movement.entity";
import { Repository } from "typeorm";


@Injectable()
export class MovementRepository {

    constructor(
        @InjectRepository(Movement)
        private readonly movementRepository: Repository<Movement>,
    ) {}

    async obtainAllMovements(): Promise<Movement[]> {
        return this.movementRepository.find({relations: ['producto', 'tipoMovimiento'], order: { fecha: 'DESC' } });
    }

    async createMovement(movementData: Partial<Movement>): Promise<Movement> {
        const newMovement = this.movementRepository.create(movementData);
        return this.movementRepository.save(newMovement);
    }

    async findMovementsAfterDate(date: Date): Promise<Movement[]> {
        return this.movementRepository.createQueryBuilder('movement')
            .leftJoinAndSelect('movement.producto', 'producto')
            .leftJoinAndSelect('movement.tipoMovimiento', 'tipoMovimiento')
            .where('movement.fecha > :date', { date: date.toISOString() })
            .orderBy('movement.fecha', 'DESC')
            .getMany();
    }

}