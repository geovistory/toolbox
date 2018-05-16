import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItService } from '../../shared/pe-it.service';
import { ActiveProjectService, EntityEditorService, InfPersistentItemApi, DfhClass } from 'app/core';
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
import { RoleSetListService } from '../../shared/role-set-list.service';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';


@Component({
  selector: 'gv-pe-it-entity-add',
  templateUrl: './pe-it-entity-add.component.html',
  styleUrls: ['./pe-it-entity-add.component.scss']
})
export class PeItEntityAddComponent implements OnInit {


  /**
   * Inputs
   */
  @Input()  dfhClass: DfhClass;

  /**
   * Output
   */
  @Output() selected: EventEmitter<number> = new EventEmitter();

  @Output() open: EventEmitter<number> = new EventEmitter();


  constructor(
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService
  ) {
    // super(peItApi, peItService, propertyPipe, activePeItService, slimLoadingBarService, entityEditor, changeDetector, ngRedux, actions, classService, roleService, propertyService, roleSetListService)
  }

  ngOnInit(){
    this.openModal()
  }

  openModal() {

    this.open.emit();

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
