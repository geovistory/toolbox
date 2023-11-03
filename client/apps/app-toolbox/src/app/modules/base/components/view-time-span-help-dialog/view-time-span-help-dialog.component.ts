import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'gv-view-time-span-help-dialog',
  templateUrl: './view-time-span-help-dialog.component.html',
  styleUrls: ['./view-time-span-help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewTimeSpanHelpDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
