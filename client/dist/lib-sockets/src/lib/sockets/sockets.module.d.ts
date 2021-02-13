import { ModuleWithProviders } from '@angular/core';
import { SocketsConfig } from './models/SocketsConfig';
export declare class SocketsModule {
    static forRoot(config: SocketsConfig): ModuleWithProviders<SocketsModule>;
    constructor(parentModule?: SocketsModule);
}
