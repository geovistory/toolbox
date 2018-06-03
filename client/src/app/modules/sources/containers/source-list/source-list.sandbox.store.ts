import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { sourceListReducer } from './source-list.reducer';
import { ISourceListState } from '../../sources.models';

@NgModule({
    imports: [NgReduxModule],
})
export class SourceSanboxStoreModule {
    constructor(
        private ngRedux: NgRedux<ISourceListState>,
        devTools: DevToolsExtension,
    ) {

        ngRedux.configureStore(
            // RootReducer
            sourceListReducer,
            // Initial state
            {},
            // Middleware
            [],
            // Enhancers
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );
    }
}
