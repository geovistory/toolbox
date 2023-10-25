import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-redux/lib/queries/information/models/AddMenuClassOrTypeItem';
import { AddEntityMenuComponent } from '../add-entity-menu/add-entity-menu.component';

@Component({
  selector: 'gv-add-entity-menu-type-item',
  templateUrl: './add-entity-menu-type-item.component.html',
  styleUrls: ['./add-entity-menu-type-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityMenuTypeItemComponent implements OnInit {
  @Input() item: AddMenuClassOrTypeItem;

  constructor(public menuComponent: AddEntityMenuComponent) { }

  ngOnInit(): void {
  }

}
