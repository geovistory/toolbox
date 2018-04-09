import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfRole, InfTemporalEntity } from 'app/core';
import { EprService } from '../../shared/epr.service';

@Component({
  selector: 'gv-pe-it-role',
  templateUrl: './pe-it-role.component.html',
  styleUrls: ['./pe-it-role.component.scss']
})
export class PeItRoleComponent extends RoleComponent implements OnInit {
  /**
   * Outputs
   */

  @Output() roleUpdated: EventEmitter<InfRole> = new EventEmitter();

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi)
  }

  onTeEntUpdated(teEnt:InfTemporalEntity) {
    this.role.temporal_entity = teEnt;
    this.roleUpdated.emit(this.role);
  }

}
