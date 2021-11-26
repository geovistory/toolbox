
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { warRoot } from '../reducer-configs/war.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';

@Injectable({
  providedIn: 'root'
})
export class WarActions {
  entity_preview = new SchemaActionsFactory<WarEntityPreview>(this.ngRedux, warRoot, 'entity_preview')

  constructor(public ngRedux: NgRedux<IAppState>) { }
}
