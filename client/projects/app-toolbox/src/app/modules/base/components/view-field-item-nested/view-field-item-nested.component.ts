import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, InfResourceWithRelations, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-nested',
  templateUrl: './view-field-item-nested.component.html',
  styleUrls: ['./view-field-item-nested.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    public itemComponent: ViewFieldItemComponent,
    public editMode: EditModeService
  ) { }


  ngOnInit(): void {
    this.resource = this.itemComponent.item.target.entity.resource
    this.projRel = this.itemComponent.item.projRel
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
    this.scope = this.itemComponent.scope
  }


}
