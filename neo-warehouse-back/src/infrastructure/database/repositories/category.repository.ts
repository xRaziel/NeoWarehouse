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
        const categories = await this.categoryRepository.find({ order: { nombre: "ASC" } });
        return categories.map(cat => ({
            ...cat,
            nombre: cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)
        }));
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

    async addCategory(name: string): Promise<Category> {
        const newCategory = this.categoryRepository.create({ nombre: name });
        return this.categoryRepository.save(newCategory);
    }
}