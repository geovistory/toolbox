import { Component, Input, OnInit, EventEmitter } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfEntityProjectRelApi, ActiveProjectService } from 'app/core';


@Component({
  selector: 'gv-version-modal',
  templateUrl: './version-modal.component.html',
  styleUrls: ['./version-modal.component.scss']
})
export class VersionModalComponent implements OnInit {
  @Input() versions;
  @Input() currentVersion;

  // If true, hide versions not used by any project
  unusedVisible:boolean=true;

  get versionsVisible (){
    let versions = [];

    if (this.unusedVisible) versions = this.versions;
    else versions = this.versions.filter(v => v.entity_version_project_rels !== null);

    return versions;
  }

  get latestVersion():number{
    let latestVersion = 0;
    this.versions.forEach(version => {
      latestVersion = latestVersion < version.entity_version ? version.entity_version : latestVersion;
    })
    return latestVersion;
  }

  get mostUsedVersion():number{
    let mostUsedVersion = 0;
    this.versions.forEach(version => {
      mostUsedVersion = mostUsedVersion < version.entity_version ? version.entity_version : mostUsedVersion;
    })
    return mostUsedVersion;
  }


  constructor(
    public activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService,
    private entityVersionProjectRelApi:InfEntityProjectRelApi,
    private activeProjectService: ActiveProjectService
  ) { }

  ngOnInit() {
  }


  /**
  * updateVersion - description
  *
  * @return {type}  description
  */
  updateVersion(version){
    this.startLoading();

    const eprPk = this.getCurrentInfEntityProjectRelPk();

    this.entityVersionProjectRelApi.patchAttributes(
      eprPk,
      {
        fk_entity_version_concat: version.pk_entity_version_concat,
        fk_entity_version: version.entity_version
      }
    ).subscribe(epr => {
      this.completeLoading();
      version.entity_version_project_rels = [epr];
      this.activeModal.close(version);
    })
  }



  /**
  * private getCurrentInfEntityProjectRelPk - get the
  * pk_entity_version_project_rel of the InfEntityProjectRel that
  * relates the current version with the active project
  *
  * @return {number}  pk_entity_version_project_rel
  */
  private getCurrentInfEntityProjectRelPk():number{

    //get current version
    const currVerWithEpr = this.versions.filter(v =>
    v.pk_entity_version_concat === this.currentVersion.pk_entity_version_concat
  )[0];

  //get current version relation to active project
  const epr = currVerWithEpr.entity_version_project_rels.filter(
  epr => epr.fk_project === this.activeProjectService.project.pk_project
)[0];

return epr.pk_entity_version_project_rel;
}

countProjects(version):number{
  if(!version.entity_version_project_rels) return 0;
  return version.entity_version_project_rels.filter(
    epr => epr.is_in_project
  ).length;
}

/**
* Loading Bar Logic
*/

startLoading() {
  this.slimLoadingBarService.progress = 20;
  this.slimLoadingBarService.start(() => {
  });
}

stopLoading() {
  this.slimLoadingBarService.stop();
}

completeLoading() {
  this.slimLoadingBarService.complete();
}

resetLoading() {
  this.slimLoadingBarService.reset();
}

}
