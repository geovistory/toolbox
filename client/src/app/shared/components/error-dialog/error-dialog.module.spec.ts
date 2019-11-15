import { ErrorDialogModule } from './error-dialog.module';

describe('ErrorDialogModule', () => {
  let errorDialogModule: ErrorDialogModule;

  beforeEach(() => {
    errorDialogModule = new ErrorDialogModule();
  });

  it('should create an instance', () => {
    expect(errorDialogModule).toBeTruthy();
  });
});
