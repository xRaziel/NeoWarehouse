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
        return this.movementRepository.find();
    }

    async createMovement(movementData: Partial<Movement>): Promise<Movement> {
        const newMovement = this.movementRepository.create(movementData);
        return this.movementRepository.save(newMovement);
    }

}