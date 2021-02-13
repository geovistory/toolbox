import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { InjectionToken } from '@angular/core';
import { IAppState } from '../root/models/model';
import { RootEpics } from '../root/root-epics';
/**
 * Function to use in combination with rxjs/operator .filter()
 * in order to get only actions dispached with a fractalkey
 * equal to the provided path.
 *
 * example:
 * pipe(
 *    filter(action => ofSubstore(c.basePath)(action)),
 *    ofType('Foo')
 * )
 * @param path
 */
export declare const ofSubstore: (path: string[]) => (action: any) => boolean;
export declare const APP_INITIAL_STATE: InjectionToken<IAppState>;
export declare class ReduxStoreModule {
    ngRedux: NgRedux<IAppState>;
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension, rootEpics: RootEpics, initialState: IAppState);
}
