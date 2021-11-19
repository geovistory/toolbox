import { Component, Input, OnInit } from '@angular/core';
import { StatementTargetTimeSpan } from '@kleiolab/lib-queries';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { TimeSpanService } from '../../services/time-span.service';

@Component({
  selector: 'gv-view-time-span-item-edit-btn',
  templateUrl: './view-time-span-item-edit-btn.component.html',
  styleUrls: ['./view-time-span-item-edit-btn.component.scss']
})
export class ViewTimeSpanItemEditBtnComponent implements OnInit {
  @Input() data: StatementTargetTimeSpan
  @Input() source: GvFieldSourceEntity

  constructor(
    private timeSpan: TimeSpanService
  ) { }

  ngOnInit(): void {
  }


  openTimespanModal() {
    this.timeSpan.openModal(this.data, this.source.fkInfo)
  }

}
