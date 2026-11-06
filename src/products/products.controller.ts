import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { SkuPipe } from '../common/pipes/sku.pipe.js';
import { Product } from './product.entity.js';

@ApiTags('Catalogo . Productos')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOkResponse({ type: [ProductResponseDto] })
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get('sku/:sku')
    @ApiOkResponse({ type: ProductResponseDto })
    @ApiNotFoundResponse()
    findBySku(@Param('sku', SkuPipe) sku: string): Promise<Product> {
        return this.productsService.findBySku(sku);
    }

    @Post()
    @ApiCreatedResponse({ type: ProductResponseDto })
    @ApiConflictResponse({
        description: 'Product with the same SKU already exists'
    })
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productsService.create(dto);
    }

    @Get(':id')
    @ApiOkResponse({ type: [ProductResponseDto] })
    @ApiNotFoundResponse({ description: 'Product not found' })
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ProductResponseDto })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateProductDto,
    ):Promise<Product> {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Desactivar el producto (borrado logico)'
    })
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productsService.remove(id);
    }
}
