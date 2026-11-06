import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProductResponseDto {
    @ApiProperty({ format: 'uuid' }) id: string;
    @ApiProperty() sku: string;
    @ApiProperty() name: string;
    @ApiProperty() price: number;
    @ApiProperty() stock: number;
    @ApiPropertyOptional({ format: 'uuid' }) categoryId?: string;
}
