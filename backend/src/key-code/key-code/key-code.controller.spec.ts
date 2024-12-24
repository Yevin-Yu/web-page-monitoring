import { Test, TestingModule } from '@nestjs/testing';
import { KeyCodeController } from './key-code.controller';

describe('KeyCodeController', () => {
  let controller: KeyCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyCodeController],
    }).compile();

    controller = module.get<KeyCodeController>(KeyCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
