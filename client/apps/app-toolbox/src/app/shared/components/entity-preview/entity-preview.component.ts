import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import getUrls from 'get-urls';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../core/active-project/active-project.service';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  urls: Array<string> = [];

  @Input() preview: WarEntityPreview
  @Input() pkEntity: number
  @Input() dragEnabled = true;
  @Input() openTabOnClick = false;
  @Input() showId = false;
  @Input() hideClass = false;
  @Input() iconGray = false
  @Input() truncateLabel = '25'
  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {

    // lazy load the preview, if only pkEntity given
    if (this.pkEntity && !this.preview) {
      this.ap.streamEntityPreview(this.pkEntity)
        .pipe(takeUntil(this.destroy$))
        .subscribe(preview => {
          this.preview = preview
          // extract urls from string
          this.urls = typeof preview.entity_label === 'string' ? [...getUrls(preview.entity_label)] : []
          this.ref.detectChanges()
        })
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


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}