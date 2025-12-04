import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/database/repositories/category.repository';

@Injectable()
export class CategoryService {

  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllCategories() {
    return this.categoryRepository.obtainAllCategories();
  }

  async getCategoryByName(name: string) {
    return this.categoryRepository.findCategoryByName(name);
  }

  async deleteCategoryByName(name: string) {
    const category = await this.getCategoryByName(name);
    if (!category) {
      return false;
    }
    await this.categoryRepository.removeCategory(name);
    return true;
  }

  async createCategory(name: string) {
    return this.categoryRepository.addCategory(name);
  }
}
