import { Injectable, Logger } from '@nestjs/common';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/infrastructure/database/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { Category } from 'src/infrastructure/database/entities/category.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IntegrationService {

  private readonly apiURL: string;
  private readonly logger = new Logger(IntegrationService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
  ) {
    const apiURL = this.configService.get<string>('EXTERNAL_API_URL');

    if (!apiURL) {
      throw new Error('EXTERNAL_API_URL is not defined in the configuration');
    }

    this.apiURL = apiURL;
  }

  async importProductsFromExternalAPI(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const products = await this.fetchProductsFromAPI();

      if(!products || products.length === 0){
        throw new Error('No products found in external API');
      }

      for (const prod of products) {
        try{
          //Validar datos del producto
          const errorValidation = this.validateProductData(prod);
          if (errorValidation) {
            this.logger.warn(`Product with ID ${prod.id} skipped: ${errorValidation}`);
            continue;
          }

          //TODO: SE PUEDE SEPARAR LA LÓGICA DE VERIFICAR EN OTROS METODOS

          //Verificar si existe el producto
          const existingProduct = await queryRunner.manager.findOne(Product, {
            where: { idExterno: prod.id.toString() }
          });
          if (existingProduct) {
            this.logger.log(`Product with external ID ${prod.id} already exists. Skipping.`);
            continue;
          }
          //Buscar o crear categoría
          let category = await queryRunner.manager.findOne(Category, {
            where: { nombre: prod.category }
          });
          if (!category) {
            category = queryRunner.manager.create(Category, { nombre: prod.category });
            await queryRunner.manager.save(category);
          }
          //Crear producto
          const newProduct = queryRunner.manager.create(Product, {
            nombre: prod.title,
            precio: prod.price,
            stock: prod.stock,
            idExterno: prod.id.toString(),
            category: category
          });
          await queryRunner.manager.save(newProduct);

        }
        catch(error){
          this.logger.error(`Failed to process product with ID ${prod.id}: ${error.message}`);
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log('Product import completed successfully.');
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
    finally {
      await queryRunner.release();
    }
  }

  private async fetchProductsFromAPI(): Promise<any[]> {
    try{
      const url = `${this.apiURL}/products`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.products;
    }
    catch (error){
      if (error.name === 'AbortError') {
        throw new Error('Request to external API timed out');
      }
      throw new Error(`Failed to fetch products from external API: ${error.message}`);
    }
  }

  private validateProductData(product: any): string | null {
    if (!product.id || typeof product.id !== 'number') {
      return 'ID inválido o faltante';
    }

    if (!product.title || typeof product.title !== 'string' || product.title.trim() === '') {
      return 'Título inválido o faltante';
    }

    if (!product.category || typeof product.category !== 'string') {
      return 'Categoría inválida o faltante';
    }

    if (typeof product.price !== 'number' || product.price < 0) {
      return 'Precio inválido';
    }

    if (typeof product.stock !== 'number' || product.stock < 0) {
      return 'Stock inválido';
    }

    return null;
  }
}
