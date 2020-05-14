import { HelpersModule } from './helpers.module';

describe('HelpersModule', () => {
  let helpersModule: HelpersModule;

  beforeEach(() => {
    helpersModule = new HelpersModule();
  });

  it('should create an instance', () => {
    expect(helpersModule).toBeTruthy();
  });
});
