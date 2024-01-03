import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-redux';
import { AddEntityMenuService } from '../add-entity-menu/add-entity-menu.service';

@Component({
  selector: 'gv-add-entity-menu-type-item',
  templateUrl: './add-entity-menu-type-item.component.html',
  styleUrls: ['./add-entity-menu-type-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AddEntityMenuTypeItemComponent {
  @Input() item: AddMenuClassOrTypeItem;
  constructor(public menu: AddEntityMenuService) { }
}
