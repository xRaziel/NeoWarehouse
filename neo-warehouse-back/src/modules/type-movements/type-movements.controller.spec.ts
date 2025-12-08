import { Test, TestingModule } from '@nestjs/testing';
import { TypeMovementsController } from './type-movements.controller';
import { TypeMovementsService } from './type-movements.service';

describe('TypeMovementsController', () => {
  let controller: TypeMovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMovementsController],
      providers: [TypeMovementsService],
    }).compile();

    controller = module.get<TypeMovementsController>(TypeMovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
