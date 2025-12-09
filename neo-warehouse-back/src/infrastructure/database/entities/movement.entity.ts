import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovementType } from "./type-movement.entity";
import { Product } from "./product.entity";


@Entity('movimiento')
export class Movement {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'cantidad', nullable: true})
    cantidad: number;

    @Column({name: 'fecha'})
    fecha: Date;

    @Column({name: 'user'})
    user: string;

    @Column({name: 'producto_id'})
    productoId: string;

    @Column({name: 'nota', nullable: true})
    nota: string;

    @ManyToOne(() => Product, product => product.movimientos)
    @JoinColumn({ name: 'producto_id' })
    producto: Product;

    @Column({name: 'tipo_movimiento_id'})
    tipoMovimientoId: string;

    @ManyToOne(() => MovementType, movementType => movementType.movimientos)
    @JoinColumn({ name: 'tipo_movimiento_id' })
    tipoMovimiento: MovementType;


}