import { Component, OnInit } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { P_1864_HAS_VALUE_VERSION_ID } from '../../../../ontome-ids';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'gv-view-field-item-entity-menu',
    templateUrl: './view-field-item-entity-menu.component.html',
    styleUrls: ['./view-field-item-entity-menu.component.scss'],
    standalone: true,
    imports: [MatMenuModule, NgIf, MatIconModule, MatDividerModule, MatButtonModule, AsyncPipe]
})
export class ViewFieldItemEntityMenuComponent implements OnInit {
  field: Field
  projRel: ProInfoProjRel
  resource: InfResourceWithRelations
  position: number;

  // if true, the target entity is a text and thus the menu allows to
  // open and edit the text in popups
  targetIsTextWithValueVersion$: Observable<boolean>

  constructor(
    public itemComponent: ViewFieldItemComponent,
    private c: ConfigurationPipesService,
  ) { }

  ngOnInit(): void {
    this.field = this.itemComponent.field
    this.projRel = this.itemComponent.item.projRel
    this.resource = this.itemComponent.item.target.entity.resource
    // fetch info if target is a text with an outgoing hasValueVersion field
    this.targetIsTextWithValueVersion$ = this.c.pipeFields(this.resource.fk_class).pipe(
      map(fields => fields.find(field => field.isOutgoing && field.property?.fkProperty === P_1864_HAS_VALUE_VERSION_ID)),
      map(f => f ? true : false)
    )
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
    this.itemComponent.remove()
  }
  openEditTextDialog() {
    this.itemComponent.openEditTextDialog()
  }
  openViewTextDialog() {
    this.itemComponent.openViewTextDialog()
  }
}
