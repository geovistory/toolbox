import { DigitalPreviewModule } from './digital-preview.module';

describe('DigitalPreviewModule', () => {
  let digitalPreviewModule: DigitalPreviewModule;

  beforeEach(() => {
    digitalPreviewModule = new DigitalPreviewModule();
  });

  it('should create an instance', () => {
    expect(digitalPreviewModule).toBeTruthy();
  });
});
