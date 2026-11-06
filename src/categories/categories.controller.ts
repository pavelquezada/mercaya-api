import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { Category } from './category.entity.js';

@ApiTags('Catalogo . Categorias')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(dto);
    }
}
