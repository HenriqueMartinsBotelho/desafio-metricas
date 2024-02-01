import { Test, TestingModule } from '@nestjs/testing';
import { MrrService } from './mrr.service';

describe('MrrService', () => {
  let service: MrrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MrrService],
    }).compile();

    service = module.get<MrrService>(MrrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
