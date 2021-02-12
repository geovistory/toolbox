import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../root/models';
import { ActionResultObservable, SchemaActionsFactory } from './schema-actions-factory';
export declare class InfActionFactory<Payload, Model> extends SchemaActionsFactory<Payload, Model> {
    ngRedux: NgRedux<IAppState>;
    /**
     * @param pk is used for facetting
     */
    remove: (items: Model[], pk?: number) => ActionResultObservable<Model>;
    /**
     * @param pk is used for facetting
     */
    removeSucceeded: (items: Model[], removePending: string, pk?: number) => void;
    constructor(ngRedux: NgRedux<IAppState>);
    createInfActions(actionPrefix: string, modelName: string): InfActionFactory<Payload, Model>;
}
