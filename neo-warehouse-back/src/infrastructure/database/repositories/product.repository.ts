import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm/repository/Repository";


@Injectable()
export class ProductRepository {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async obtainAllProducts(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['category'], order: { nombre: 'ASC' } });
    }

    async findProductBySKU(sku: string): Promise<Product | null> {
        return this.productRepository.findOne({ where: { sku: sku }, relations: ['category'] });
    }

    async findProductsByCategory(categoryName: string): Promise<Product[]> {
        return this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('category.nombre = :categoryName', { categoryName })
            .getMany();
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(productData);
        return this.productRepository.save(newProduct);
    }

    async updateProductBySKU(sku: string, updateData: Partial<Product>): Promise<Product | null> {
        const product = await this.findProductBySKU(sku);
        if (!product) {
            return null;
        }
        Object.assign(product, updateData);
        return this.productRepository.save(product);
    }

    async updateProduct(productData: Partial<Product>): Promise<Product | null> {
        const sku = productData.sku;
        const product = await this.findProductBySKU(sku!);
        if (!product) {
            return null;
        }
        Object.assign(product, productData);
        return this.productRepository.save(product);
    }

    async removeProduct(sku: string): Promise<void> {
        await this.productRepository.delete({ sku: sku });
    }

}