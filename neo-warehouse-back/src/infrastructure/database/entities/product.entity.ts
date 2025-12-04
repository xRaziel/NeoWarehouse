import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Movement } from "./movement.entity";


@Entity('producto')
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'nombre'})
    nombre: string;

    @Column({name: 'precio', type: 'decimal'})
    precio: number;

    @Column({name: 'stock'})
    stock: number;

    @Column({name: 'id_externo', nullable: true})
    idExterno: string;

    @Column({name: 'sku', nullable: false})
    sku: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'categoria_id' })
    category: Category;

    @OneToMany(() => Movement, movimiento => movimiento.producto)
    movimientos: Movement[];


}