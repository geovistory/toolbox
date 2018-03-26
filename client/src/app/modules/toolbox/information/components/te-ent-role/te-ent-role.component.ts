import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfAppellation, InfLanguage } from 'app/core';
import { EprService } from '../../shared/epr.service';

@Component({
  selector: 'gv-te-ent-role',
  templateUrl: './te-ent-role.component.html',
  styleUrls: ['./te-ent-role.component.scss']
})
export class TeEntRoleComponent extends RoleComponent implements OnInit {


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

  startEditing(){
    this.roleState = 'edit';
  }

  stopEditing(){
    this.roleState = 'editable';
  }
  

}
