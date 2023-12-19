import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { TimeSpanPipe } from '@kleiolab/lib-utils';
import { DndModule } from '@suez/ngx-dnd';
import getUrls from 'get-urls';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../services/active-project.service';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { ClassInfoComponent } from '../onto-info/class-info/class-info.component';

/**
 * This component generates a small UI preview for an entity.
 * The UI consists of two parts: the entity label and the class info.
 * While the entity label is a simple string, the class info consists of
 * an icon (see ClassInfoComponent) and the class label (string).
 */
@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
  standalone: true,
  imports: [NgIf, ClassInfoComponent, DndModule, MatMenuModule, MatIconModule, NgFor, NgTemplateOutlet, TimeSpanPipe, TruncatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPreviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  urls: Array<string> = [];

  /**
   * If preview is set, the data is statically used to render the UI and
   * updates of the entity preview in the state store are not taken into account.
   */
  @Input() preview: WarEntityPreview
  /**
   * The id of the entity. The component subscribes to the stream of entity previews
   * with this id and updates preview with it.
   */
  @Input() pkEntity: number
  /**
   * If true, the component is draggable (drag data is the preview)
   */
  @Input() dragEnabled = true;
  /**
   * If true, a click on the component opens a menu to open a new tab with the details of the entity.
   */
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
