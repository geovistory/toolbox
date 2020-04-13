import { Component, OnInit, Input, HostBinding, ViewChild, OnDestroy } from '@angular/core';
import { EntityPreview, ActiveProjectService } from 'app/core';
import { MatMenuTrigger } from '../../../../../node_modules/@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() preview: EntityPreview
  @Input() pkEntity: number
  @Input() dragEnabled = true;
  @Input() openTabOnClick = false;

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {

    // lazy load the preview, if only pkEntity given
    if (this.pkEntity && !this.preview) {
      this.p.streamEntityPreview(this.pkEntity)
        .pipe(takeUntil(this.destroy$))
        .subscribe(preview => this.preview = preview)
    }

  }

  openInNewTab() {
    this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
  }
  addAndOpenInNewTab() {
    this.p.addPeItToProject(this.preview.pk_entity, () => {
      this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
