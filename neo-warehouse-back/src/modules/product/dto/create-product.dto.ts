import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
    nombre: string;

    @ApiProperty({ example: 999.99, description: 'Price of the product' })
    precio: number;

    @ApiProperty({ example: 50, description: 'Stock quantity of the product' })
    stock: number;

    @ApiProperty({ example: 'EXT12345', description: 'External ID of the product', required: false })
    id_externo?: string;

    @ApiProperty({ example: 'SKU12345', description: 'SKU of the product' })
    sku: string;

    @ApiProperty({ example: 'Electronics', description: 'Category ID of the product', required: false })
    categoria_id?: string;
}
