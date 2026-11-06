import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { Category } from './category.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ) { }

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find({ order: { name: 'ASC' } });
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category)
            throw new NotFoundException(`Category with id ${id} not found`);

        return category;
    }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const exists = await this.categoriesRepository.existsBy({ name: ILike(dto.name) })
        if (exists) {
            throw new ConflictException(`Category with name ${dto.name} already exists`);
        }

        return this.categoriesRepository.save(
            this.categoriesRepository.create(dto)
        );
    }
}
