import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/getAllCategories")
  @ApiOperation({ summary: 'Retrieve all categories' })
  async getAllCategories() {
    try {
      const categories = await this.categoryService.getAllCategories();
      if (!categories || categories.length === 0) {
        return { status: 'success', data: [], message: 'No categories found' };
      }
      return { status: 'success', data: categories };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get("/getCategoryByName/:name")
  @ApiOperation({ summary: 'Retrieve a category by name' })
  async getCategoryByName(@Param('name') name: string) {
    try {
      if (!name || name.trim().length === 0) {
        throw new Error('Category name cannot be empty');
      }
      const category = await this.categoryService.getCategoryByName(name);
      if (!category) {
        return { status: 'error', message: `Category with name "${name}" not found` };
      }
      return { status: 'success', data: category };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Delete("/deleteCategory/:name")
  @ApiOperation({ summary: 'Delete a category by name' })
  async deleteCategory(@Param('name') name: string) {
    try {
      if (!name || name.trim().length === 0) {
        throw new Error('Category name cannot be empty');
      }
      const deleted = await this.categoryService.deleteCategoryByName(name);
      if (!deleted) {
        return { status: 'error', message: `Category with name "${name}" not found` };
      }
      return { status: 'success', message: `Category with name "${name}" deleted successfully` };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Post("/createCategory")
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() body: { nombre: string }) {
    try {
      if (!body.nombre || body.nombre.trim().length === 0) {
        throw new Error('Category name cannot be empty');
      }
      const createdCategory = await this.categoryService.createCategory(body.nombre);
      return { status: 'success', data: createdCategory };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}