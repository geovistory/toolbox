import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { Configuration, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
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
export declare function apiConfigFactory(): Configuration;
export declare class ReduxModule {
    ngRedux: NgRedux<IAppState>;
    static forRoot(): ModuleWithProviders;
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension, rootEpics: RootEpics, initialState: IAppState, parentModule: ReduxModule, sdkLb3: SdkLb3Module, sdkLb4: SdkLb4Module);
}
