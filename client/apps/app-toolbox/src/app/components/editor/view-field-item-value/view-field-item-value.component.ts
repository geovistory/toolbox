import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Field } from '@kleiolab/lib-redux';
import getUrls from 'get-urls';
import { Observable } from 'rxjs';
import { EditModeService } from '../../../services/edit-mode.service';
import { ClassInfoComponent } from '../../../shared/components/onto-info/class-info/class-info.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-value',
  templateUrl: './view-field-item-value.component.html',
  styleUrls: ['./view-field-item-value.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), ClassInfoComponent, NgIf, MatMenuModule, NgFor, MatIconModule, MatDividerModule, MatButtonModule, AsyncPipe]
})
export class ViewFieldItemValueComponent {
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  urls: Array<string> = [];
  constructor(
    public item: ViewFieldItemService,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.showOntoInfo$ = this.item.component.showOntoInfo$
    this.urls = [...getUrls(this.item.component.item.targetLabel)]
  }
}

