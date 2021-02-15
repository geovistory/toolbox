import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { FluxStandardAction } from 'flux-standard-action';
import { Epic } from 'redux-observable-es6-compat';
export declare class LoadingBarEpics {
    private service;
    constructor(service: SlimLoadingBarService);
    createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any>;
    private createCompleteLoadingBarEpic;
    private createStartLoadingBarEpic;
}
