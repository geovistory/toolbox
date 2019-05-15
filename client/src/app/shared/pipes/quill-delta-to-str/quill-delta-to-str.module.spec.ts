import { QuillDeltaToStrModule } from './quill-delta-to-str.module';

describe('QuillDeltaToStrModule', () => {
  let quillOpsToStrModule: QuillDeltaToStrModule;

  beforeEach(() => {
    quillOpsToStrModule = new QuillDeltaToStrModule();
  });

  it('should create an instance', () => {
    expect(quillOpsToStrModule).toBeTruthy();
  });
});
