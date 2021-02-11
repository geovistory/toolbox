import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WarEntityPreview } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { ActiveProjectPipesService } from '../../../core/redux-queries/services/active-project-pipes.service';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() preview: WarEntityPreview
  @Input() pkEntity: number
  @Input() dragEnabled = true;
  @Input() openTabOnClick = false;
  @Input() showId = false;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
  ) { }

  ngOnInit() {

    // lazy load the preview, if only pkEntity given
    if (this.pkEntity && !this.preview) {
      this.ap.streamEntityPreview(this.pkEntity)
        .pipe(takeUntil(this.destroy$))
        .subscribe(preview => this.preview = preview)
    }

  }

  openInNewTab() {
    this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class)
  }
  addAndOpenInNewTab() {
    this.p.addEntityToProject(this.preview.pk_entity, () => {
      this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class)
    })
  }

  editEntity() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
