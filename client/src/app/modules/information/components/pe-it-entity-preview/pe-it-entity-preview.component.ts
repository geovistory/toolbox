import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItEntityPreviewModalComponent } from '../pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { InfPersistentItemApi, ActiveProjectService, EntityEditorService, InfEntityProjectRelApi, InfRole, Project, InfPersistentItem } from 'app/core';
import { PeItService } from '../../shared/pe-it.service';
import { ActivePeItService } from '../../shared/active-pe-it.service';
import { ClassService } from '../../shared/class.service';
import { AppellationLabel } from '../../shared/appellation-label/appellation-label';
import { PropertyPipe } from '../../shared/property.pipe';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { PeItComponent } from '../../containers/pe-it/pe-it.component';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { NumberSymbol } from '@angular/common';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { peItReducer } from '../../containers/pe-it/pe-it.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: peItReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-entity-preview',
  templateUrl: './pe-it-entity-preview.component.html',
  styleUrls: ['./pe-it-entity-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeItEntityPreviewComponent extends PeItComponent implements OnInit {

  @Input() pkEntity: number;
  @Input() peIt: InfPersistentItem;
  @Input() isCircular: boolean;


  /**
  * Properties
  */

  previewData: { appellationString?: string } = {};

  isInProject: boolean;

  constructor(
    peItApi: InfPersistentItemApi,
    peItService: PeItService,
    activeProjectService: ActiveProjectService,
    propertyPipe: PropertyPipe,
    activePeItService: ActivePeItService,
    slimLoadingBarService: SlimLoadingBarService,
    entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    ngRedux: NgRedux<IPeItState>,
    actions: PeItActions,
    classService: ClassService,
    roleService: RoleService,
    propertyService: PropertyService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private eprApi: InfEntityProjectRelApi,
    roleSetListService: RoleSetListService
  ) {
    super(peItApi, peItService, propertyPipe, activePeItService, slimLoadingBarService, entityEditor, changeDetector, ngRedux, actions, classService, roleService, propertyService, roleSetListService)
  }

  ngOnChanges() {
  }

  //gets called by base class
  // init() {
  //   this.checkIfInProject().subscribe(() => {
  //     if (this.isInProject) {
  //       this.queryRichObjectOfProject().subscribe(() => {
  //         this.setPreviewDataOfProject();
  //       });
  //     }
  //     else {
  //       this.queryRichObjectOfRepo().subscribe(() => {
  //         this.setPreviewDataOfRepo();
  //       });
  //     }
  //   });
  // }


  // checkIfInProject() {
  //   const onDone = new EventEmitter();
  //   this.ngRedux.select<Project>('activeProject').subscribe(project => {

  //     const pkEntity = this.pkEntity || (this.peIt ? this.peIt.pk_entity : undefined);
  //     this.eprApi.find({
  //       'where': {
  //         'fk_entity': pkEntity,
  //         'fk_project': project.pk_project
  //       }
  //     }).subscribe(eprs => {
  //       if (eprs.length > 0) {
  //         this.isInProject = true;
  //       }
  //       else {
  //         this.isInProject = false;
  //       }

  //       onDone.emit()
  //     })
  //   })

  //   return onDone;
  // }


  // setPreviewDataOfProject() {
  //   if (this.peIt.pi_roles) {

  //     this.peIt.pi_roles.filter((role => role.fk_property === 1)) // R63
  //       .forEach(role => {
  //         const appeObj = role.temporal_entity.te_roles
  //           .filter((role) => {
  //             return (
  //               role.fk_property === 2 && // R64
  //               role.entity_version_project_rels[0].is_in_project
  //             )
  //           })
  //         [0].appellation;

  //         this.previewData.appellationString = new AppellationLabel(appeObj.appellation_label).getString();
  //       })
  //   }
  // }


  // setPreviewDataOfRepo() {
  //   if (this.peIt.pi_roles) {

  //     let mostPopularAppe: InfRole;
  //     let highestCount: number = 0;

  //     this.peIt.pi_roles.filter((role => role.fk_property === 1)) // R63
  //       .forEach(role => {

  //         if (highestCount < role.is_standard_in_project_count) {
  //           mostPopularAppe = role;
  //           highestCount = role.is_standard_in_project_count;
  //         }
  //       })

  //     const appeObj = mostPopularAppe.temporal_entity.te_roles
  //       .filter((role) => {
  //         return (
  //           role.fk_property === 2 // R64
  //         )
  //       })
  //     [0].appellation;

  //     this.previewData.appellationString = new AppellationLabel(appeObj.appellation_label).getString();
  //   }
  // }


  open() {
    // const urlTree = this.router.createUrlTree(["..", this.pkEntity], { relativeTo: this.route, preserveQueryParams:true });
    // window.open(this.router.serializeUrl(urlTree), '_blank')
    const open = () => {

      this.router.navigate(["../", this.peItState.peIt.pk_entity], {
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      })
        .then(() => {
          console.log('ok')
        }).catch(() => {
          console.log('oops')
        })
    }


    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }

    const modalRef = this.modalService.open(PeItEntityPreviewModalComponent, entityModalOptions);

    modalRef.componentInstance.isInProject = (this.peItState.peIt.entity_version_project_rels && this.peItState.peIt.entity_version_project_rels.length)
    modalRef.componentInstance.parentPath = this.parentPath;

    modalRef.result
      .then(() => { open() })
      .catch(() => { });


  }

}
