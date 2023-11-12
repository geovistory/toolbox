import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Field } from '@kleiolab/lib-redux';
import getUrls from 'get-urls';
import { Observable } from 'rxjs';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value',
  templateUrl: './view-field-item-value.component.html',
  styleUrls: ['./view-field-item-value.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), OntoInfoModule, NgIf, MatMenuModule, NgFor, MatIconModule, MatDividerModule, MatButtonModule, AsyncPipe]
})
export class ViewFieldItemValueComponent {
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  urls: Array<string> = [];
  constructor(
    public itemComponent: ViewFieldItemComponent,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
    this.urls = [...getUrls(this.itemComponent.item.targetLabel)]
  }
}

