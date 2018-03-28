import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi } from 'app/core';
import { EprService } from '../../shared/epr.service';

@Component({
  selector: 'gv-pe-it-role',
  templateUrl: './pe-it-role.component.html',
  styleUrls: ['./pe-it-role.component.scss']
})
export class PeItRoleComponent extends RoleComponent implements OnInit {

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
