import { TruncateModule } from './truncate.module';

describe('TruncateModule', () => {
  let truncateModule: TruncateModule;

  beforeEach(() => {
    truncateModule = new TruncateModule();
  });

  it('should create an instance', () => {
    expect(truncateModule).toBeTruthy();
  });
});
