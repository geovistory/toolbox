import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'core-table-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class CoreTableMenuComponent {
  @Output() clear = new Subject<void>();
}
