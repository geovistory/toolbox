import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from "../models/SocketsConfig";
import { WarActions } from '@kleiolab/lib-redux';
export declare class EntityPreviewSocket extends Socket {
    constructor(warActions: WarActions, config?: SocketsConfig);
}
