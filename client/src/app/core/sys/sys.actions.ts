import { dispatch, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Sys } from './sys.models';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { StandardActionsFactory } from 'app/core/store/actions';
import { IAppState } from '../store/model';
import { sysRoot } from './sys.config';
import { SysAnalysisType, SysClassHasTypeProperty } from '../sdk/models';

type Payload = Sys;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SysAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SysActions {

  system_relevant_class = new StandardActionsFactory<Payload, SysSystemRelevantClass>
    (this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');

  class_has_type_property = new StandardActionsFactory<Payload, SysClassHasTypeProperty>
    (this.ngRedux).createCrudActions(sysRoot, 'class_has_type_property');

  analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
    (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
