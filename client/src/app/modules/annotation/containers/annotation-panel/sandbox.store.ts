import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { annotationPanelReducer } from './annotation-panel.reducer';
import { IAnnotationPanelState } from '../../annotation.models';

@NgModule({
    imports: [NgReduxModule],
})
export class AnnotationSanboxStoreModule {
    constructor(
        private ngRedux: NgRedux<IAnnotationPanelState>,
        devTools: DevToolsExtension,
    ) {

        ngRedux.configureStore(
            // RootReducer
            annotationPanelReducer,
            // Initial state
            {},
            // Middleware
            [],
            // Enhancers
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );
    }
}
