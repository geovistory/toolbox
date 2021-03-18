import { ProgressDialogModule } from './progress-dialog.module';

describe('ProgressDialogModule', () => {
  let progressDialogModule: ProgressDialogModule;

  beforeEach(() => {
    progressDialogModule = new ProgressDialogModule();
  });

  it('should create an instance', () => {
    expect(progressDialogModule).toBeTruthy();
  });
});
