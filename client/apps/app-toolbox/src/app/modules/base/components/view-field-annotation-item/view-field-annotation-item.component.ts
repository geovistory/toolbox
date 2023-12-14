import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { EntityPreviewModule } from '../../../../shared/components/entity-preview/entity-preview.module';
import { ActiveProjectService } from '../../../../shared/services/active-project.service';
import { TextDetail2Component } from '../../../data/components/text-detail2/text-detail2.component';
import { IndexedCharids } from '../../../quill/quill-edit/quill-edit.component';
import { EditModeService } from '../../services/edit-mode.service';
import type { ViewFieldAnnotationItemData } from '../view-field-annotations/view-field-annotations.component';

@Component({
  selector: 'gv-view-field-annotation-item',
  templateUrl: './view-field-annotation-item.component.html',
  styleUrls: ['./view-field-annotation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgIf, MatProgressSpinnerModule, NgFor, EntityPreviewModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule, AsyncPipe]
})
export class ViewFieldAnnotationItemComponent implements OnInit {
  @Input() itemData: ViewFieldAnnotationItemData

  highlight$: Observable<boolean>
  deleting$ = new BehaviorSubject(false)

  constructor(
    public textEditComponent: TextDetail2Component,
    public p: ActiveProjectService,
    public editMode: EditModeService
  ) {

  }

  ngOnInit(): void {
    this.highlight$ = this.textEditComponent.annotationsToHighlightInList$.pipe(
      map(annotations => {
        return annotations.includes(this.itemData.hasAnnotation.target.entity.resource.pk_entity)
      }),
      distinctUntilChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  }

  onMousenter() {
    const chars: IndexedCharids<true> = {}
    const ops = this.itemData.hasSpot?.[0]?.target?.appellation?.quill_doc?.ops
    if (ops) {
      ops.forEach(op => { chars[op.attributes.charid] = true; })
    }
    this.textEditComponent.charsToHighlight$.next(chars)
  }
  onMouseleave() {
    this.textEditComponent.charsToHighlight$.next({})
  }

  openEntity() {
    const e = this.itemData.refersTo?.[0]?.target?.entity?.resource
    if (e) this.p.addEntityTab(e.pk_entity, e.fk_class)
  }

  openAnnotation() {
    const e = this.itemData.hasAnnotation?.target?.entity?.resource
    if (e) this.p.addEntityTab(e.pk_entity, e.fk_class)
  }

  removeAnnotation() {
    const e = this.itemData.hasAnnotation?.target?.entity?.resource
    if (e) {
      this.deleting$.next(true)
      this.p.removeEntityFromProject(e.pk_entity)
    }
  }
}
