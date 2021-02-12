import { FluxStandardAction } from 'flux-standard-action';
declare type Payload = any;
export declare type LoadingBarAction = FluxStandardAction<Payload, undefined>;
/**
* This actions start, stop and complete the global loading bar
* using a SlimLoadingBarService instantiated within the loading-bar
* module.
*
* In order to show a loading bar in GUI, use the LoadingBarComponent
* exported by this module.
*/
export declare class LoadingBarActions {
    static readonly START = "LOADING_BAR_START";
    static readonly STOP = "LOADING_BAR_STOP";
    static readonly COPMLETE = "LOADING_BAR_COPMLETE";
    startLoading: () => FluxStandardAction<any, undefined>;
    stopLoading: () => FluxStandardAction<any, undefined>;
    completeLoading: () => FluxStandardAction<any, undefined>;
}
export {};
