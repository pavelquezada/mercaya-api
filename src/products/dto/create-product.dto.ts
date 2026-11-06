import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Matches, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        example: 'AZU-CAR-1KG',
        description: 'SKU of the product must be unique and uppercase',
    })
    @Transform(({ value }: { value: unknown }) =>
        typeof value === 'string' ? value.toUpperCase() : value,
    )
    @Matches(/^[A-Z]{3}-[A-Z]{3,4}-\d+[A-Z]$/, {
        message: 'SKU must to have AZU-CAR-1KG format'
    })
    sku: string;

    @ApiProperty( {
        example: 'Carrot',
        description: 'Name of the product'
    } )
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        example: 1.99,
        description: 'Price of the product'
    })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be numeric' })
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;

    @ApiProperty({
        example: 10,
        description: 'Stock of the product'
    })
    @IsInt()
    @IsPositive()
    stock: number;
    
    @ApiPropertyOptional({
        example: 'uuid',
        description: 'Category ID of the product'
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;
}
