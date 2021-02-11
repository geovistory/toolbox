import { DetailContentModule } from './detail-content.module';

describe('DetailContentModule', () => {
  let detailContentModule: DetailContentModule;

  beforeEach(() => {
    detailContentModule = new DetailContentModule();
  });

  it('should create an instance', () => {
    expect(detailContentModule).toBeTruthy();
  });
});
