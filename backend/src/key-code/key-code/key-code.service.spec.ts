import { Test, TestingModule } from '@nestjs/testing';
import { KeyCodeService } from './key-code.service';

describe('KeyCodeService', () => {
  let service: KeyCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyCodeService],
    }).compile();

    service = module.get<KeyCodeService>(KeyCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
