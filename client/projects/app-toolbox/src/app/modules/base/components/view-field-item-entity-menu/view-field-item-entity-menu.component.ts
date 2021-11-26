import { Component, OnInit } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { InfResourceWithRelations, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-entity-menu',
  templateUrl: './view-field-item-entity-menu.component.html',
  styleUrls: ['./view-field-item-entity-menu.component.scss']
})
export class ViewFieldItemEntityMenuComponent implements OnInit {
  field: Field
  projRel: ProInfoProjRel
  resource: InfResourceWithRelations
  constructor(public itemComponent: ViewFieldItemComponent) { }

  ngOnInit(): void {
    this.field = this.itemComponent.field
    this.projRel = this.itemComponent.item.projRel
    this.resource = this.itemComponent.item.target.entity.resource
  }
  openInNewTabFromEntity() {
    this.itemComponent.openInNewTabFromEntity(this.resource)
  }
  addAndOpenInNewTabFromEntity() {
    this.itemComponent.addAndOpenInNewTabFromEntity(this.resource)
  }
  markAsFavorite() {
    this.itemComponent.markAsFavorite()
  }
  removeEntity() {
    this.itemComponent.removeEntity()
  }
}
