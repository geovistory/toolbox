import { Component, OnInit } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
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
    private c: ConfigurationPipesService
  ) { }

  ngOnInit(): void {
    this.resource = this.itemComponent.item.target.entity.resource
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

}
