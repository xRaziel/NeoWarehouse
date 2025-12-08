import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovementType } from "../entities/type-movement.entity";



@Injectable()
export class MovementTypeRepository {

    constructor(
        @InjectRepository(MovementType)
        private readonly movementTypeRepository: Repository<MovementType>,
    ){}

    async findMovementTypeByName(name: string): Promise<MovementType | null> {
        return this.movementTypeRepository.findOne({ where: { tipo: name } });
    }
    async obtainAllMovementTypes(): Promise<MovementType[]> {
        return this.movementTypeRepository.find();
    }
}