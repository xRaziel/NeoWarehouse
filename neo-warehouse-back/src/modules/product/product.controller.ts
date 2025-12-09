import { Controller, Get, Param, BadRequestException, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
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
        return { status: 'success', data: [], message: 'No se encontraron productos' };
      }
      return { status: 'success', data: products };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get("/getCountProducts")
  @ApiOperation({ summary: 'Retrieve total count of products' })
  async getCountProducts() {
    try{
      const products = await this.productService.getAllProducts();
      const count = products.length;
      return { status: 'success', data: { count } };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get("/getStockProducts")
  @ApiOperation({ summary: 'Retrieve total stock of all products' })
  async getStockProducts() {
    try{
      const totalStock = await this.productService.getAllStocks();
      return { status: 'success', data: { totalStock } };
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
        throw new BadRequestException('El SKU no puede estar vacío');
      }

      const product = await this.productService.getProductBySKU(sku.trim());
      
      if (!product) {
        throw new NotFoundException(`Producto con SKU "${sku}" no encontrado`);
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
        throw new BadRequestException('La categoría no puede estar vacía');
      }


      const products = await this.productService.getProductsByCategory(category.trim());
      
      if (!products || products.length === 0) {
        throw new NotFoundException(`No se encontraron productos para la categoría "${category}"`);
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
        throw new BadRequestException('El nombre del producto no puede estar vacío');
      }

      if (!body.precio || body.precio <= 0) {
        throw new BadRequestException('El precio del producto debe ser mayor que cero');
      }

      if (!body.stock || body.stock < 0) {
        throw new BadRequestException('El stock del producto no puede ser negativo');
      }

      if (!body.sku || body.sku.trim().length === 0) {
        throw new BadRequestException('El SKU del producto no puede estar vacío');
      }

      if (body.categoria_id && body.categoria_id.trim().length === 0) {
        throw new BadRequestException('El ID de categoría del producto no puede estar vacío si se proporciona');
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
        throw new BadRequestException('El SKU no puede estar vacío');
      }

      if (newStock < 0) {
        throw new BadRequestException('La nueva cantidad de stock no puede ser negativa');
      }

      const updatedProduct = await this.productService.updateProductStock(sku.trim(), newStock);
      
      if (!updatedProduct) {
        throw new NotFoundException(`Producto con SKU "${sku}" no encontrado`);
      }

      return { status: 'success', data: updatedProduct };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Delete("/deleteProduct/:sku")
  @ApiOperation({ summary: 'Delete a product by SKU' })
  @ApiParam({ name: 'sku', description: 'Product SKU', example: 'SKU123' })
  async deleteProduct(@Param('sku') sku: string) {
    try{
      // Validar que SKU no esté vacío
      if (!sku || sku.trim().length === 0) {
        throw new BadRequestException('El SKU no puede estar vacío');
      }

      await this.productService.deleteProduct(sku.trim());

      return { status: 'success', message: `Producto con SKU "${sku}" ha sido eliminado` };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Put("/updateProduct")
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(@Body() body: CreateProductDto) {
    try{

      if (!body.sku || body.sku.trim().length === 0) {
        throw new BadRequestException('El SKU del producto no puede estar vacío');
      }
      const updatedProduct = await this.productService.updateProduct(body);
      if (!updatedProduct) {
        throw new NotFoundException(`Producto con SKU "${body.sku}" no encontrado`);
      }
      return { status: 'success', data: updatedProduct };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}