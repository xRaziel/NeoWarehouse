import { Test, TestingModule } from '@nestjs/testing';
import { TypeMovementsService } from './type-movements.service';

describe('TypeMovementsService', () => {
  let service: TypeMovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeMovementsService],
    }).compile();

    service = module.get<TypeMovementsService>(TypeMovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
