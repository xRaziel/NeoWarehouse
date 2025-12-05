import { Injectable } from '@nestjs/common';
import { Product } from 'src/infrastructure/database/entities/product.entity';
import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryRepository } from 'src/infrastructure/database/repositories/category.repository';

@Injectable()
export class ProductService {
  
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllProducts() : Promise<Product[]> {
    return await this.productRepository.obtainAllProducts();
  }

  async getProductBySKU(sku: string) : Promise<Product | null> {
    return await this.productRepository.findProductBySKU(sku);
  }

  async getProductsByCategory(category: string) : Promise<Product[]> {
    return await this.productRepository.findProductsByCategory(category);
  }

  async createProduct(productData: CreateProductDto) : Promise<Product> {

    const category = await this.getCategoryByName(productData.category.nombre);
    
    if (!category) {
      throw new Error(`Category with name "${productData.category.nombre}" not found`);
    }

    const product = new Product();
    product.nombre = productData.nombre;
    product.precio = productData.precio;
    product.stock = productData.stock;
    product.idExterno = productData.id_externo || '';
    product.sku = productData.sku;
    product.category = category;
    return this.productRepository.createProduct(product);
  }

  async updateProductStock(sku: string, newStock: number) : Promise<Product | null> {
    return this.productRepository.updateProductBySKU(sku, { stock: newStock });
    
  }

  async deleteProduct(sku: string) : Promise<void> {
    return this.productRepository.removeProduct(sku);
  }

  async updateProduct(product: Partial<Product>) : Promise<Product | null> {
    if (!product.sku) {
        throw new Error('SKU is required for updating a product');
    }
    return this.productRepository.updateProduct(product);
  }

  private async getCategoryByName(categoryName: string) {
    return this.categoryRepository.findCategoryByName(categoryName);
  }
}