import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, ProInfoProjRelApi, InfRoleApi } from 'app/core';
import { RoleDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { PropertyFieldService } from '../../../shared/property-field.service';
import { PropertyFieldActions } from '../../property-field.actions';
import { PropertyFieldBase } from '../../property-field.base';
import { PropertyFieldApiEpics } from '../../property-field.epics';

@Component({
  selector: 'gv-pe-it-property-field-create-ctrl',
  templateUrl: './pe-it-property-field-create-ctrl.component.html',
  styleUrls: ['./pe-it-property-field-create-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItPropertyFieldCreateCtrlComponent),
      multi: true
    }
  ]
})
export class PeItPropertyFieldCreateCtrlComponent extends PropertyFieldBase  {

  init(): void {
  }

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
    protected fb: FormBuilder
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)
  }


}
