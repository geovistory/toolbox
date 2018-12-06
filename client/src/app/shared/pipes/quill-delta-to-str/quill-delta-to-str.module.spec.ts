import { QuillDeltaToStrModule } from './quill-delta-to-str.module';

describe('QuillDeltaToStrModule', () => {
  let quillDeltaToStrModule: QuillDeltaToStrModule;

  beforeEach(() => {
    quillDeltaToStrModule = new QuillDeltaToStrModule();
  });

  it('should create an instance', () => {
    expect(quillDeltaToStrModule).toBeTruthy();
  });
});
