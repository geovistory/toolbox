import { AsyncPipe, NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Field } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-cell',
  templateUrl: './view-field-item-cell.component.html',
  styleUrls: ['./view-field-item-cell.component.scss'],
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), OntoInfoModule, NgIf, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, AsyncPipe]
})
export class ViewFieldItemCellComponent {
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  constructor(
    public item: ViewFieldItemService,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.showOntoInfo$ = this.item.component.showOntoInfo$
  }

}

