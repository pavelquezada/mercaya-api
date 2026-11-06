import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Bebidas' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name: string;

    @ApiPropertyOptional({ example: 'Bebidas y refrescos' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;
}
