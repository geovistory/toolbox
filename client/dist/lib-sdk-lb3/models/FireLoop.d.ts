import { FireLoopRef } from './index';
export declare class FireLoop {
    private socket;
    private models;
    private references;
    constructor(socket: any, models: {
        get: Function;
    });
    ref<T>(model: any): FireLoopRef<T>;
}
