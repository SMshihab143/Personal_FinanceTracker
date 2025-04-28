import { Test, TestingModule } from '@nestjs/testing';
import { SideHustleService } from './sidehustle.service';

describe('SidehustleService', () => {
  let service: SideHustleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SideHustleService],
    }).compile();

    service = module.get<SideHustleService>(SideHustleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
