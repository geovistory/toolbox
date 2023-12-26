import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-redux';
import { InfResourceWithRelations, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { P_1864_HAS_VALUE_VERSION_ID } from '../../../lib/constants/ontome-ids';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

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
    public item: ViewFieldItemService,
    private c: ConfigurationPipesService,
  ) { }

  ngOnInit(): void {
    this.field = this.item.component.field
    this.projRel = this.item.component.item.projRel
    this.resource = this.item.component.item.target.entity.resource
    // fetch info if target is a text with an outgoing hasValueVersion field
    this.targetIsTextWithValueVersion$ = this.c.pipeFields(this.resource.fk_class).pipe(
      map(fields => fields.find(field => field.isOutgoing && field.property?.fkProperty === P_1864_HAS_VALUE_VERSION_ID)),
      map(f => f ? true : false)
    )
  }
  openInNewTabFromEntity() {
    this.item.component.openInNewTabFromEntity(this.resource)
  }
  addAndOpenInNewTabFromEntity() {
    this.item.component.addAndOpenInNewTabFromEntity(this.resource)
  }
  markAsFavorite() {
    this.item.component.markAsFavorite()
  }
  removeEntity() {
    this.item.component.remove()
  }
  openEditTextDialog() {
    this.item.component.openEditTextDialog()
  }
  openViewTextDialog() {
    this.item.component.openViewTextDialog()
  }
}
