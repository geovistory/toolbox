import { Epic } from 'redux-observable-es6-compat';
export declare class ActionResolverEpics {
    constructor();
    createEpics: () => Epic<any, any, any, any>;
    private createResolveEpic;
}
