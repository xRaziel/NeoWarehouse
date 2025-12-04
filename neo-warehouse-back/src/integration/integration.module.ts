import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infrastructure/database/entities/category.entity';
import { Product } from 'src/infrastructure/database/entities/product.entity';

@Module({
  controllers: [IntegrationController],
  providers: [IntegrationService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product, Category]),
  ],
  exports: [IntegrationService],
})
export class IntegrationModule {}
