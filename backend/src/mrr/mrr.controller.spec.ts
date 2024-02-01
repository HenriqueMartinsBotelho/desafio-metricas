import { Test, TestingModule } from '@nestjs/testing';
import { MrrController } from './mrr.controller';
import { MrrService } from './mrr.service';

describe('MrrController', () => {
  let controller: MrrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MrrController],
      providers: [MrrService],
    }).compile();

    controller = module.get<MrrController>(MrrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
