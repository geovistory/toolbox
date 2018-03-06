import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { PeItEntityComponent } from '../pe-it-entity/pe-it-entity.component';
import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { PeItService } from '../shared/services/pe-it.service';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PropertyPipe } from '../shared/pipes/property';
import { ActivePeItService } from '../shared/services/active-pe-it.service';
import { ClassService } from '../shared/services/class.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { InfAppellation } from '../shared/sdk/models/InfAppellation';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { PeItEntityPreviewModalComponent } from '../pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { InfRole } from '../shared/sdk/models/InfRole';

@Component({
  selector: 'gv-pe-it-entity-preview',
  templateUrl: './pe-it-entity-preview.component.html',
  styleUrls: ['./pe-it-entity-preview.component.scss']
})
export class PeItEntityPreviewComponent extends PeItEntityComponent implements OnInit {


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
    classService: ClassService,
    entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private eprApi: InfEntityProjectRelApi
  ) {
    super(peItApi, peItService, activeProjectService, propertyPipe, activePeItService, slimLoadingBarService, classService, entityEditor, changeDetector)

  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.checkIfInProject().subscribe(() => {
      if (this.isInProject) {
        this.queryRichObjectOfProject().subscribe(() => {
          this.setPreviewDataOfProject();
        });
      }
      else {
        this.queryRichObjectOfRepo().subscribe(() => {
          this.setPreviewDataOfRepo();
        });
      }
    });
  }


  checkIfInProject() {
    const onDone = new EventEmitter();

    const pkProject = this.activeProjectService.project.pk_project;
    const pkEntity = this.pkEntity || (this.peIt ? this.peIt.pk_entity:undefined);
    this.eprApi.find({
      'where': {
        'fk_entity': pkEntity,
        'fk_project': pkProject
      }
    }).subscribe(eprs => {
      if (eprs.length > 0) {
        this.isInProject = true;
      }
      else {
        this.isInProject = false;
      }

      onDone.emit()
    })

    return onDone;
  }


  setPreviewDataOfProject() {
    if (this.peIt.pi_roles) {

      this.peIt.pi_roles.filter((role => role.fk_property === 1)) // R63
      .forEach(role => {
      const appeObj = role.temporal_entity.te_roles
      .filter((role) => {
        return (
          role.fk_property === 2 && // R64
          role.entity_version_project_rels[0].is_in_project
        )
      })
      [0].appellation;

      this.previewData.appellationString = new AppellationLabel(appeObj.appellation_label).getString();
    })
  }
}


setPreviewDataOfRepo() {
  if (this.peIt.pi_roles) {

    let mostPopularAppe: InfRole;
    let highestCount: number = 0;

    this.peIt.pi_roles.filter((role => role.fk_property === 1)) // R63
    .forEach(role => {

    if (highestCount < role.is_standard_in_project_count) {
      mostPopularAppe = role;
      highestCount = role.is_standard_in_project_count;
    }
  })

  const appeObj = mostPopularAppe.temporal_entity.te_roles
  .filter((role) => {
    return (
      role.fk_property === 2 // R64
    )
  })
  [0].appellation;

  this.previewData.appellationString = new AppellationLabel(appeObj.appellation_label).getString();
}
}


open() {
  // const urlTree = this.router.createUrlTree(["..", this.pkEntity], { relativeTo: this.route, preserveQueryParams:true });
  // window.open(this.router.serializeUrl(urlTree), '_blank')
  const open = () => {

  this.router.navigate(["../", this.pkEntity], {
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

modalRef.componentInstance.isInProject = this.isInProject;
modalRef.componentInstance.stdAppe = this.previewData.appellationString;
modalRef.componentInstance.pkEntity = this.pkEntity;

modalRef.result
.then(() => { open() })
.catch(() => { });


}

}
