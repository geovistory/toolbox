import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfAppellation, InfLanguage } from 'app/core';
import { EprService } from '../../shared/epr.service';

@Component({
  selector: 'gv-role-of-te-ent',
  templateUrl: './role-of-te-ent.component.html',
  styleUrls: ['./role-of-te-ent.component.scss']
})
export class RoleOfTeEntComponent extends RoleComponent implements OnInit {


/**
 * Inputs
 */

@Input() fkTeEnt:number;

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi)
  }


  /**
  * Methods specific to create state
  */

  peItReadyToCreate(entity) {

    if (entity instanceof InfAppellation) {
      this.role.appellation = entity
    }

    if (entity instanceof InfLanguage) {
      this.role.language = entity
    }

    if (typeof entity === 'number') {
      this.role.fk_entity = entity
    }

    this.isReadyToCreate = true;

    this.readyToCreate.emit(this.role);

  }


  peItNotReadyToCreate() {

    this.isReadyToCreate = false;

    this.notReadyToCreate.emit()

  }


}
