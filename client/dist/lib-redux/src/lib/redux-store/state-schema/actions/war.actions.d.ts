import { NgRedux } from '@angular-redux/store';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models';
import { WarEntityPreviewSlice } from '../models';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export declare class WarActions {
    ngRedux: NgRedux<IAppState>;
    entity_preview: SchemaActionsFactory<WarEntityPreviewSlice, WarEntityPreview>;
    constructor(ngRedux: NgRedux<IAppState>);
}
