import { SocketsModule } from './sockets.module';

describe('SocketsModule', () => {
  let socketsModule: SocketsModule;

  beforeEach(() => {
    socketsModule = new SocketsModule();
  });

  it('should create an instance', () => {
    expect(socketsModule).toBeTruthy();
  });
});
