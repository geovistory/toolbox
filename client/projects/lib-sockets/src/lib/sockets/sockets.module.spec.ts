import { TestBed } from '@angular/core/testing';
import { moduleImports } from '../../__tests__/helpers/module-imports';
import { SocketsConfig } from './models/SocketsConfig';
import { ConfigService } from './services/config.service';
import { SocketsModule, SOCKETS_CONFIG } from './sockets.module';

const config: SocketsConfig = { baseUrl: 'foo' }
describe('SocketsModule', () => {
  let module: SocketsModule;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports,
      providers: [
        {
          provide: SOCKETS_CONFIG,
          useValue: config
        }
      ]
    })
    module = TestBed.inject(SocketsModule);
    configService = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });
  it('should have baseUrl', () => {
    expect(configService.config.baseUrl).toBe('foo');
  });
});
