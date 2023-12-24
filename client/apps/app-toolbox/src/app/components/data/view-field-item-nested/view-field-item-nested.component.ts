import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfResourceWithRelations, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditModeService } from '../../../modules/base/services/edit-mode.service';
import { EntityWithFieldsComponent } from '../entity-with-fields/entity-with-fields.component';
import { ViewFieldItemClassInfoComponent } from '../view-field-item-class-info/view-field-item-class-info.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemEntityMenuComponent } from '../view-field-item-entity-menu/view-field-item-entity-menu.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';

@Component({
  selector: 'gv-view-field-item-nested',
  templateUrl: './view-field-item-nested.component.html',
  styleUrls: ['./view-field-item-nested.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [forwardRef(() => ViewFieldItemContainerComponent), NgClass, ViewFieldItemClassInfoComponent, EntityWithFieldsComponent, NgIf, MatButtonModule, MatIconModule, ViewFieldItemEntityMenuComponent, AsyncPipe]
})
export class ViewFieldItemNestedComponent implements OnInit {

  resource: InfResourceWithRelations;
  projRel?: ProInfoProjRel;
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  scope: GvFieldPageScope

  expanded$ = new BehaviorSubject(true)

  constructor(
    public item: ViewFieldItemService,
    public editMode: EditModeService
  ) { }


  ngOnInit(): void {
    this.resource = this.item.component.item.target.entity.resource
    this.projRel = this.item.component.item.projRel
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.showOntoInfo$ = this.item.component.showOntoInfo$
    this.scope = this.item.component.scope
  }


}
