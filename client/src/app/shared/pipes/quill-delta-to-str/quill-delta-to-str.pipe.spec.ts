import { QuillOpsToStrPipe } from './quill-delta-to-str.pipe';

describe('QuillDeltaToStrPipe', () => {
  it('create an instance', () => {
    const pipe = new QuillOpsToStrPipe();
    expect(pipe).toBeTruthy();
  });
});
