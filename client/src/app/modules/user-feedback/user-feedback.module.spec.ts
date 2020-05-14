import { UserFeedbackModule } from './user-feedback.module';

describe('UserFeedbackModule', () => {
  let userFeedbackModule: UserFeedbackModule;

  beforeEach(() => {
    userFeedbackModule = new UserFeedbackModule();
  });

  it('should create an instance', () => {
    expect(userFeedbackModule).toBeTruthy();
  });
});
