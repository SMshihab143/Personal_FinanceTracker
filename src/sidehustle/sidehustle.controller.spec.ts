import { Test, TestingModule } from '@nestjs/testing';
import { SideHustleController } from './sidehustle.controller';

describe('SidehustleController', () => {
  let controller: SideHustleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SideHustleController],
    }).compile();

    controller = module.get<SideHustleController>(SideHustleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
