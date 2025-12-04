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
        return this.productRepository.find();
    }

    async findProductBySKU(sku: string): Promise<Product | null> {
        return this.productRepository.findOne({ where: { sku: sku } });
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(productData);
        return this.productRepository.save(newProduct);
    }

    async updateProduct(sku: string, updateData: Partial<Product>): Promise<Product | null> {
        await this.productRepository.update(sku, updateData);
        return this.productRepository.findOne({ where: { sku } });
    }

    async removeProduct(sku: string): Promise<void> {
        await this.productRepository.delete({ sku: sku });
    }

}