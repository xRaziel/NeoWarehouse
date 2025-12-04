import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm/repository/Repository";



@Injectable()
export class CategoryRepository {
    
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async obtainAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findCategoryByName(name: string): Promise<Category | null> {
        return this.categoryRepository.findOne({ where: { nombre: name } });
    }

    async createCategory(name: string): Promise<Category> {
        const newCategory = this.categoryRepository.create({ nombre: name });
        return this.categoryRepository.save(newCategory);
    }

    async removeCategory(name: string): Promise<void> {
        await this.categoryRepository.delete({ nombre: name });
    }
}