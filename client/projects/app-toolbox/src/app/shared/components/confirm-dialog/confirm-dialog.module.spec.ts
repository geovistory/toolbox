import { ConfirmDialogModule } from './confirm-dialog.module';

describe('ConfirmDialogModule', () => {
  let confirmDialogModule: ConfirmDialogModule;

  beforeEach(() => {
    confirmDialogModule = new ConfirmDialogModule();
  });

  it('should create an instance', () => {
    expect(confirmDialogModule).toBeTruthy();
  });
});
