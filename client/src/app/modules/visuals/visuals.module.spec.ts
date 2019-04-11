import { VisualsModule } from './visuals.module';

describe('VisualsModule', () => {
  let visualsModule: VisualsModule;

  beforeEach(() => {
    visualsModule = new VisualsModule();
  });

  it('should create an instance', () => {
    expect(visualsModule).toBeTruthy();
  });
});
