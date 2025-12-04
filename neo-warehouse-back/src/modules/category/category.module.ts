import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/infrastructure/database/repositories/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/database/entities/category.entity';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Category
    ]),
  ],
})
export class CategoryModule {}
