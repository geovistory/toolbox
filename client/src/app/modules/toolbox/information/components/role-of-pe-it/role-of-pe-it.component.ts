import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi } from 'app/core';
import { EprService } from '../../shared/epr.service';

@Component({
  selector: 'gv-role-of-pe-it',
  templateUrl: './role-of-pe-it.component.html',
  styleUrls: ['./role-of-pe-it.component.scss']
})
export class RoleOfPeItComponent extends RoleComponent implements OnInit {

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi)
  }


}
