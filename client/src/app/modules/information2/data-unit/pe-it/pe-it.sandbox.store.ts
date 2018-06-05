import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { PeItDetail } from '../../information.models';
import { peItReducer } from './pe-it.reducer';
import { provideReduxForms } from '@angular-redux/form';

@NgModule({
    imports: [NgReduxModule],
})
export class PeItSanboxStoreModule {
    constructor(
        private ngRedux: NgRedux<PeItDetail>,
        devTools: DevToolsExtension,
    ) {

        ngRedux.configureStore(
            // RootReducer
            peItReducer,
            // Initial state
            {},
            // Middleware
            [],
            // Enhancers
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );

        // Enable syncing of Angular form state with our Redux store.
        provideReduxForms(ngRedux);
    }
}
