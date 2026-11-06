import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity.js";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string | null;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
