import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { FluxStandardAction } from 'flux-standard-action';
import { Epic } from 'redux-observable-es6-compat';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
export declare class LoadingBarEpics {
    private service;
    private actions;
    constructor(service: SlimLoadingBarService, actions: LoadingBarActions);
    createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any>;
    private createCompleteLoadingBarEpic;
    private createStartLoadingBarEpic;
}
