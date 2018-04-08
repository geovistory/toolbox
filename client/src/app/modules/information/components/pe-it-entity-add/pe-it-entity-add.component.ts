import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItService } from '../../shared/pe-it.service';
import { ActiveProjectService, EntityEditorService, InfPersistentItemApi } from 'app/core';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { PropertyPipe } from '../../shared/property.pipe';
import { PeItEntityActions } from '../pe-it-entity/pe-it-entity.actions';
import { NgRedux } from '@angular-redux/store';
import { IPeIt } from '../pe-it-entity/pe-it-entity.model';


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
  @Output() selected: EventEmitter<number> = new EventEmitter();


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
    actions: PeItEntityActions,
    ngRedux: NgRedux<IPeIt>,
    private entityAddModalService: EntityAddModalService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(peItApi, peItService, activeProjectService, propertyPipe, activePeItService, slimLoadingBarService, classService, entityEditor, changeDetector, actions, ngRedux)

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
    this.entityAddModalService.onSelect.subscribe(pkEntity => {
      this.selected.emit(pkEntity);
    })

  }

}
