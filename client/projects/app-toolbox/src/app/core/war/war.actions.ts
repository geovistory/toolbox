
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { StandardActionsFactory } from '../redux-store/actions';
import { WarEntityPreviewSlice } from './war.models';
import { warRoot } from './war.config';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";
import { IAppState } from '../redux-store/model';

@Injectable()
export class WarActions {
  entity_preview = new StandardActionsFactory<WarEntityPreviewSlice, WarEntityPreview>(this.ngRedux).createCrudActions(warRoot, 'entity_preview')

  constructor(public ngRedux: NgRedux<IAppState>) { }
}
