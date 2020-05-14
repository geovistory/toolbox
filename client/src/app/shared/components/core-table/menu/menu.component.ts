import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'core-table-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreTableMenuComponent {
  @Output() clear = new Subject<void>();
}
