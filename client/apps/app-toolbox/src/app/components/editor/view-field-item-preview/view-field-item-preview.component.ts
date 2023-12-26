import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, OnInit, Optional, forwardRef } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EditModeService } from '../../../services/edit-mode.service';
import { EntityPreviewComponent } from '../../../shared/components/entity-preview/entity-preview.component';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import { ViewFieldItemClassInfoComponent } from '../view-field-item-class-info/view-field-item-class-info.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemEntityMenuComponent } from '../view-field-item-entity-menu/view-field-item-entity-menu.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-preview',
  templateUrl: './view-field-item-preview.component.html',
  styleUrls: ['./view-field-item-preview.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), ViewFieldItemClassInfoComponent, EntityPreviewComponent, NgIf, ViewFieldItemEntityMenuComponent, AsyncPipe]
})
export class ViewFieldItemPreviewComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>

  constructor(
    public item: ViewFieldItemService,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService
  ) { }

  ngOnInit(): void {
    const errors: string[] = []

    if (!this.item.component.field) errors.push('field is required.');
    if (!this.item.component.item) errors.push('item is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.resource = this.item.component.item.target.entity.resource
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.showOntoInfo$ = this.item.component.showOntoInfo$
  }

}
