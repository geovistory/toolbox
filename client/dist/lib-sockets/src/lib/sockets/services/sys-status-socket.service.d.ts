import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
export declare class SysStatusSocket extends Socket {
    constructor(config?: SocketsConfig);
}
