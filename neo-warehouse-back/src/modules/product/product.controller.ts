import { Controller, Get, Param, BadRequestException, NotFoundException, Post, Body, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/getAllProducts")
  @ApiOperation({ summary: 'Retrieve all products' })
  async getAllProducts() {
    try{
      const products = await this.productService.getAllProducts();
      if (!products || products.length === 0) {
        return { status: 'success', data: [], message: 'No products found' };
      }
      return { status: 'success', data: products };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get("/getProductBySKU/:sku")
  @ApiOperation({ summary: 'Retrieve a product by SKU' })
  @ApiParam({ name: 'sku', description: 'Product SKU', example: 'SKU123' })
  async getProductBySKU(@Param('sku') sku: string) {
    try{
      // Validar que SKU no esté vacío
      if (!sku || sku.trim().length === 0) {
        throw new BadRequestException('SKU cannot be empty');
      }

      const product = await this.productService.getProductBySKU(sku.trim());
      
      if (!product) {
        throw new NotFoundException(`Product with SKU "${sku}" not found`);
      }

      return { status: 'success', data: product };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get("/getProductsByCategory/:category")
  @ApiOperation({ summary: 'Retrieve products by category' })
  @ApiParam({ name: 'category', description: 'Category name', example: 'Electronics' })
  async getProductsByCategory(@Param('category') category: string) {
    try{
      // Validar que category no esté vacío
      if (!category || category.trim().length === 0) {
        throw new BadRequestException('Category cannot be empty');
      }


      const products = await this.productService.getProductsByCategory(category.trim());
      
      if (!products || products.length === 0) {
        throw new NotFoundException(`No products found for category "${category}"`);
      }

      return { status: 'success', data: products };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Post("/createProduct")
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() body: CreateProductDto) {
    try{

      if (!body.nombre || body.nombre.trim().length === 0) {
        throw new BadRequestException('Product name cannot be empty');
      }

      if (!body.precio || body.precio <= 0) {
        throw new BadRequestException('Product price must be greater than zero');
      }

      if (!body.stock || body.stock < 0) {
        throw new BadRequestException('Product stock cannot be negative');
      }

      if (!body.sku || body.sku.trim().length === 0) {
        throw new BadRequestException('Product SKU cannot be empty');
      }

      if (body.categoria_id && body.categoria_id.trim().length === 0) {
        throw new BadRequestException('Product category ID cannot be empty if provided');
      }

      const newProduct = await this.productService.createProduct(body);
      return { status: 'success', data: newProduct };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Put("/updateProductStock/:sku/:newStock")
  @ApiOperation({ summary: 'Update product stock by SKU' })
  @ApiParam({ name: 'sku', description: 'Product SKU', example: 'SKU123' })
  @ApiParam({ name: 'newStock', description: 'New stock quantity', example: 100 })
  async updateProductStock(@Param('sku') sku: string, @Param('newStock') newStock: number) {
    try{
      // Validar que SKU no esté vacío
      if (!sku || sku.trim().length === 0) {
        throw new BadRequestException('SKU cannot be empty');
      }

      if (newStock < 0) {
        throw new BadRequestException('New stock quantity cannot be negative');
      }

      const updatedProduct = await this.productService.updateProductStock(sku.trim(), newStock);
      
      if (!updatedProduct) {
        throw new NotFoundException(`Product with SKU "${sku}" not found`);
      }

      return { status: 'success', data: updatedProduct };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}