import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity('categoria')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'nombre'})
    nombre: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}