import { BasicModule } from './basic.module';

describe('BasicModule', () => {
  let basicModule: BasicModule;

  beforeEach(() => {
    basicModule = new BasicModule();
  });

  it('should create an instance', () => {
    expect(basicModule).toBeTruthy();
  });
});
