import { FluxStandardAction } from 'flux-standard-action';
export declare const INIT_SANDBOX_STATE = "INIT_SANDBOX_STATE";
export declare const sandboxStateReducer: (lastState: {}, action: FluxStandardAction<any, undefined>) => {};
export declare const pendingRequestReducer: (state: {}, action: any) => {};
export declare const resolvedRequestReducer: (state: {}, action: any) => {};
export declare const cleanupResolved: (state: {}, action: any) => {};
export declare const SET_APP_STATE = "SET_APP_STATE";
export declare const setAppState: (state: {}, action: any) => {};
export declare const rootReducer: import("redux").Reducer<any, import("redux").AnyAction>;
