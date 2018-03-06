import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'; import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { PeItService } from '../shared/services/pe-it.service';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PropertyPipe } from '../shared/pipes/property';
import { ActivePeItService } from '../shared/services/active-pe-it.service';
import { ClassService } from '../shared/services/class.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { DfhClass } from '../shared/sdk/models/DfhClass';

@Component({
  selector: 'gv-pe-it-entity-add',
  templateUrl: './pe-it-entity-add.component.html',
  styleUrls: ['./pe-it-entity-add.component.scss']
})
export class PeItEntityAddComponent extends PeItEntityComponent implements OnInit {


  /**
   * Inputs
   */
  @Input() fkClass: number;

  /**
   * Output
   */
  @Output() selected:EventEmitter<number> = new EventEmitter();


  constructor(
    peItApi: InfPersistentItemApi,
    peItService: PeItService,
    activeProjectService: ActiveProjectService,
    propertyPipe: PropertyPipe,
    activePeItService: ActivePeItService,
    slimLoadingBarService: SlimLoadingBarService,
    classService: ClassService,
    entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    private entityAddModalService: EntityAddModalService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(peItApi, peItService, activeProjectService, propertyPipe, activePeItService, slimLoadingBarService, classService, entityEditor, changeDetector)

  }
  ngOnInit() {
    this.initDfhClass(this.fkClass);
  }
  ngOnChanges() {
  }

  openModal() {
    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }
    const modalRef = this.modalService.open(EntityAddModalComponent, entityModalOptions);

    this.entityAddModalService.previousState = undefined;
    this.entityAddModalService.state = 'search-existing';
    this.entityAddModalService.selectRoleRange = true;
    this.entityAddModalService.selectedClass = this.dfhClass;
    this.entityAddModalService.onSelect.subscribe(pkEntity=>{
      this.selected.emit(pkEntity);
    })

  }

}
