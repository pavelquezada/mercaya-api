import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { CategoriesService } from '../categories/categories.service.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly categoriesService: CategoriesService
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
            relations: { category: true }
        });
    }

    async create(dto: CreateProductDto): Promise<Product> {
        await this.ensureSkuIsFree(dto.sku);
        if (dto.categoryId) await this.categoriesService.findOne(dto.categoryId);
        const product = this.productsRepository.create(dto);

        return this.productsRepository.save(product);
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!product)
            throw new NotFoundException(`Product with ${id} not found`);

        return product;
    }

    async findBySku(sku: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { sku },
            relations: { category: true },
        });
        if (!product)
            throw new NotFoundException(`Product with SKU ${sku} not found`);

        return product;
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (dto.sku && dto.sku !== product.sku) await this.ensureSkuIsFree(dto.sku);
        if (dto.categoryId) await this.categoriesService.findOne(dto.categoryId);
        this.productsRepository.merge(product, dto);

        return this.productsRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const result = await this.productsRepository.update(
            { id },
            { isActive: false },
        );
        if (result.affected === 0)
            throw new NotFoundException(`Product ${id} not found`);
    }

    private async ensureSkuIsFree(sku: string): Promise<void> {
        if (await this.productsRepository.findOne({ where: { sku } })) {
            throw new ConflictException(`Product with SKU ${sku} already exists`);
        }
    }
}
