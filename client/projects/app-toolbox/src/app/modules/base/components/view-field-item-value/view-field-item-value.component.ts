import { Component } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import getUrls from 'get-urls';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value',
  templateUrl: './view-field-item-value.component.html',
  styleUrls: ['./view-field-item-value.component.scss']
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

