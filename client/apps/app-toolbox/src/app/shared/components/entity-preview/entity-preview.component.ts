import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { TimeSpanPipe } from '@kleiolab/lib-utils';
import { DndModule } from '@suez/ngx-dnd';
import getUrls from 'get-urls';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../services/active-project.service';
import { ClassInfoComponent } from '../onto-info/class-info/class-info.component';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
  standalone: true,
  imports: [NgIf, ClassInfoComponent, DndModule, MatMenuModule, MatIconModule, NgFor, NgTemplateOutlet, TimeSpanPipe, TruncatePipe]
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
