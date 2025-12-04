import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./movement.entity";


@Entity('tipo_movimiento')
export class MovementType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'tipo'})
    tipo: string;

    @OneToMany(() => Movement, movimiento => movimiento.tipoMovimiento)
    movimientos: Movement[];
}