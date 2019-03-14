import { DetailTopBarModule } from './detail-top-bar.module';

describe('DetailTopBarModule', () => {
  let detailTopBarModule: DetailTopBarModule;

  beforeEach(() => {
    detailTopBarModule = new DetailTopBarModule();
  });

  it('should create an instance', () => {
    expect(detailTopBarModule).toBeTruthy();
  });
});
