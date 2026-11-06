import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { decimalTransformer } from "../database/transformes/decimal.transformer.js";
import { Category } from "../categories/category.entity.js";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 40, unique: true })
    sku: string;
    
    @Column({ length: 100 })
    name: string;

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: decimalTransformer
    })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'category_id', type: 'uuid', nullable: true })
    categoryId: string | null;
    
    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'category_id'})
    category?: Category | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
