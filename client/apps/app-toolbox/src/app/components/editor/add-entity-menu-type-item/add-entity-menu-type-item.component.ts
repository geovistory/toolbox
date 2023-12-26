import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AddEntityMenuComponent } from '../add-entity-menu/add-entity-menu.component';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-redux';

@Component({
    selector: 'gv-add-entity-menu-type-item',
    templateUrl: './add-entity-menu-type-item.component.html',
    styleUrls: ['./add-entity-menu-type-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AddEntityMenuTypeItemComponent {
  @Input() item: AddMenuClassOrTypeItem;
  constructor(public menuComponent: AddEntityMenuComponent) { }
}
