import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
export declare class ImportTableSocket extends Socket {
    connected: boolean;
    constructor(config?: SocketsConfig);
    cleanConnect(): void;
    cleanDisconnect(): void;
}
