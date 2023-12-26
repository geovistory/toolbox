import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, OnInit, Optional, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { openSelectPlatformVocabItem } from '../../../lib/dialogs/openSelectPlatformVocabItem';
import { EditModeService } from '../../../services/edit-mode.service';
import { EntityPreviewComponent } from '../../../shared/components/entity-preview/entity-preview.component';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import type { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemClassInfoComponent } from '../view-field-item-class-info/view-field-item-class-info.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-preview-platform-vocabulary',
  templateUrl: './view-field-item-preview-platform-vocabulary.component.html',
  styleUrls: ['./view-field-item-preview-platform-vocabulary.component.scss'],
  providers: [
    { provide: READ_ONLY, useValue: true }
  ],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), ViewFieldItemClassInfoComponent, EntityPreviewComponent, NgIf, MatButtonModule, MatIconModule, AsyncPipe]
})
export class ViewFieldItemPreviewPlatformVocabularyComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  fieldBody: ViewFieldBodyComponent
  showOntoInfo$: Observable<boolean>

  constructor(
    public item: ViewFieldItemService,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const errors: string[] = []

    if (!this.item.component.fieldBody) errors.push('fieldBody is required.');
    if (!this.item.component.field) errors.push('field is required.');
    if (!this.item.component.item) errors.push('item is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.resource = this.item.component.item.target.entity.resource
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.fieldBody = this.item.component.fieldBody.component
    this.showOntoInfo$ = this.item.component.showOntoInfo$
  }

  async onEdit() {
    if (this.field.identityDefiningForSource) {
      return await this.item.component.displayNotRemovableWarning();
    }
    await openSelectPlatformVocabItem(
      this.dialog,
      this.fieldBody.source,
      this.field,
      this.item.component.item.targetClass,
      this.item.component.item
    ).afterClosed().toPromise();

    return undefined
  }

  async onDelete() {
    await this.item.component.remove()
  }

}
