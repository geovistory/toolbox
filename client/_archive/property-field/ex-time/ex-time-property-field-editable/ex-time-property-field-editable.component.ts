import { Component, OnInit } from '@angular/core';
import { PropertyFieldBase } from '../../property-field.base';
import { ProInfoProjRelApi, InfRoleApi, IAppState, InfTemporalEntityApi } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { PropertyFieldActions } from '../../property-field.actions';
import { PropertyFieldService } from '../../../shared/property-field.service';
import { RoleDetail } from 'app/core/state/models';
import { RoleActions } from '../../../role/role.actions';
import { ClassService } from '../../../shared/class.service';
import { FormBuilder } from '@angular/forms';
import { PropertyFieldApiEpics } from '../../property-field.epics';
import { RootEpics } from 'app/core/store/epics';

@Component({
  selector: 'gv-ex-time-property-field-editable',
  templateUrl: './ex-time-property-field-editable.component.html',
  styleUrls: ['./ex-time-property-field-editable.component.scss']
})
export class ExTimePropertyFieldEditableComponent extends PropertyFieldBase {


  constructor(
    protected rootEpics: RootEpics,
    protected epics: PropertyFieldApiEpics,
    protected eprApi: ProInfoProjRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PropertyFieldActions,
    protected propertyFieldService: PropertyFieldService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder,
    protected teEntApi: InfTemporalEntityApi
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)
  }

  init(): void {

  }
}
