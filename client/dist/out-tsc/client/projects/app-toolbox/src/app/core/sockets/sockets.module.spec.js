import { SocketsModule } from './sockets.module';
describe('SocketsModule', () => {
    let socketsModule;
    beforeEach(() => {
        socketsModule = new SocketsModule();
    });
    it('should create an instance', () => {
        expect(socketsModule).toBeTruthy();
    });
});
//# sourceMappingURL=sockets.module.spec.js.map