import { QuillOpsToStrModule } from './quill-delta-to-str.module';

describe('QuillDeltaToStrModule', () => {
  let quillOpsToStrModule: QuillOpsToStrModule;

  beforeEach(() => {
    quillOpsToStrModule = new QuillOpsToStrModule();
  });

  it('should create an instance', () => {
    expect(quillOpsToStrModule).toBeTruthy();
  });
});
