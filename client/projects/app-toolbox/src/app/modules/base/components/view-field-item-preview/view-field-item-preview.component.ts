import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-preview',
  templateUrl: './view-field-item-preview.component.html',
  styleUrls: ['./view-field-item-preview.component.scss']
})
export class ViewFieldItemPreviewComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>

  constructor(
    public itemComponent: ViewFieldItemComponent,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService
  ) { }

  ngOnInit(): void {
    const errors: string[] = []

    if (!this.itemComponent.field) errors.push('field is required.');
    if (!this.itemComponent.item) errors.push('item is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.resource = this.itemComponent.item.target.entity.resource
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

}
