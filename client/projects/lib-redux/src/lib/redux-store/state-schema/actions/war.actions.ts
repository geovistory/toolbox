
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models';
import { WarEntityPreviewSlice } from '../models';
import { warRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';

@Injectable()
export class WarActions {
  entity_preview = new SchemaActionsFactory<WarEntityPreviewSlice, WarEntityPreview>(this.ngRedux).createCrudActions(warRoot, 'entity_preview')

  constructor(public ngRedux: NgRedux<IAppState>) { }
}
