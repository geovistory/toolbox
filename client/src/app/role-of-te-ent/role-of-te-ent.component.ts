import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { InfRole } from '../shared/sdk/models/InfRole';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { EprService } from '../shared/services/epr.service';
import { InfEntityProjectRel } from '../shared/sdk/models/InfEntityProjectRel';
import { PropertyComponent } from '../property/property.component';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { EntitiesToCreate } from '../shared/interfaces/entities-to-create';
import { InfAppellation } from '../shared/sdk/models/InfAppellation';
import { InfTemporalEntity } from '../shared/sdk/models/InfTemporalEntity';
import { InfLanguage } from '../shared/sdk/models/InfLanguage';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';
import { InfRoleApi } from '../shared/sdk/services/custom/InfRole';
import { RoleComponent } from '../role/role.component';

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
