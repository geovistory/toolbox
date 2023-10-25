import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { BaseModalsService } from '../../services/base-modals.service';
import { EditModeService } from '../../services/edit-mode.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-preview-platform-vocabulary',
  templateUrl: './view-field-item-preview-platform-vocabulary.component.html',
  styleUrls: ['./view-field-item-preview-platform-vocabulary.component.scss'],
  providers: [
    { provide: READ_ONLY, useValue: true }
  ]
})
export class ViewFieldItemPreviewPlatformVocabularyComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  fieldBody: ViewFieldBodyComponent
  showOntoInfo$: Observable<boolean>

  constructor(
    public itemComponent: ViewFieldItemComponent,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService,
    private dialogs: BaseModalsService,
  ) { }

  ngOnInit(): void {
    const errors: string[] = []

    if (!this.itemComponent.fieldBody) errors.push('fieldBody is required.');
    if (!this.itemComponent.field) errors.push('field is required.');
    if (!this.itemComponent.item) errors.push('item is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.resource = this.itemComponent.item.target.entity.resource
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.fieldBody = this.itemComponent.fieldBody
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

  async onEdit() {
    if (this.field.identityDefiningForSource) {
      return await this.itemComponent.displayNotRemovableWarning();
    }
    await this.dialogs.openSelectPlatformVocabItem(
      this.fieldBody.source,
      this.field,
      this.itemComponent.item.targetClass,
      this.itemComponent.item
    ).afterClosed().toPromise();

  }

  async onDelete() {
    await this.itemComponent.remove()
  }

}
