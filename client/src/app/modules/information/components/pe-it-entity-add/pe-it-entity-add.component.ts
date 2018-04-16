import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItService } from '../../shared/pe-it.service';
import { ActiveProjectService, EntityEditorService, InfPersistentItemApi } from 'app/core';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
// import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { PropertyPipe } from '../../shared/property.pipe';
import { NgRedux } from '@angular-redux/store';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { PeItComponent } from '../../containers/pe-it/pe-it.component';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';


@Component({
  selector: 'gv-pe-it-entity-add',
  templateUrl: './pe-it-entity-add.component.html',
  styleUrls: ['./pe-it-entity-add.component.scss']
})
export class PeItEntityAddComponent extends PeItComponent implements OnInit {


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
    propertyPipe: PropertyPipe,
    activePeItService: ActivePeItService,
    slimLoadingBarService: SlimLoadingBarService,
    entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    actions: PeItActions,
    ngRedux: NgRedux<IPeItState>,
    classService: ClassService,
    roleService: RoleService,
    propertyService: PropertyService,
    private entityAddModalService: EntityAddModalService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(peItApi, peItService, propertyPipe, activePeItService, slimLoadingBarService, entityEditor, changeDetector, ngRedux, actions, classService, roleService, propertyService)
  }

  ngOnInit() {
    // this.initDfhClass(this.fkClass);
  }
  ngOnChanges() {
  }

  openModal() {
    // const entityModalOptions: NgbModalOptions = {
    //   size: 'lg'
    // }
    // const modalRef = this.modalService.open(EntityAddModalComponent, entityModalOptions);

    // this.entityAddModalService.previousState = undefined;
    // this.entityAddModalService.state = 'search-existing';
    // this.entityAddModalService.selectRoleRange = true;
    // // this.entityAddModalService.selectedClass = this.dfhClass;
    // this.entityAddModalService.onSelect.subscribe(pkEntity => {
    //   this.selected.emit(pkEntity);
    // })

  }

}
