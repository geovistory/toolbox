import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExistenceTimeHelpComponent } from '../ctrl-time-span/existence-time-help/existence-time-help.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'gv-view-time-span-help-dialog',
    templateUrl: './view-time-span-help-dialog.component.html',
    styleUrls: ['./view-time-span-help-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatDialogModule, ExistenceTimeHelpComponent, MatButtonModule]
})
export class ViewTimeSpanHelpDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
