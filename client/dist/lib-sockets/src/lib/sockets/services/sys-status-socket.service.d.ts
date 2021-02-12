import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
export declare class SysStatusSocket extends Socket {
    constructor(config?: SocketsConfig);
}
