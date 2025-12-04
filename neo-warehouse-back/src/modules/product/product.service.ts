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
    const products = await this.productRepository.obtainAllProducts();
    console.log('products:',products);
    
    return products;
  }

  async getProductBySKU(sku: string) : Promise<Product | null> {
    return this.productRepository.findProductBySKU(sku);
  }

  async getProductsByCategory(category: string) : Promise<Product[]> {
    return this.productRepository.findProductsByCategory(category);
  }

  async createProduct(productData: CreateProductDto) : Promise<Product> {

    if (!productData.categoria_id) {
      throw new Error('categoria_id is required');
    }

    const category = await this.getCategoryByName(productData.categoria_id);
    
    if (!category) {
      throw new Error(`Category with name "${productData.categoria_id}" not found`);
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
    return this.productRepository.updateProduct(sku, { stock: newStock });
    
  }

  async deleteProduct(sku: string) : Promise<void> {
    return this.productRepository.removeProduct(sku);
  }

  private async getCategoryByName(categoryName: string) {
    return this.categoryRepository.findCategoryByName(categoryName);
  }
}