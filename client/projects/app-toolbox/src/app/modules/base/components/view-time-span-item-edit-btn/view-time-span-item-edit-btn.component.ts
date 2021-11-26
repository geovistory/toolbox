import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { TimeSpanData, TimeSpanService } from '../../services/time-span.service';

@Component({
  selector: 'gv-view-time-span-item-edit-btn',
  templateUrl: './view-time-span-item-edit-btn.component.html',
  styleUrls: ['./view-time-span-item-edit-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTimeSpanItemEditBtnComponent implements OnInit {
  @Input() timeSpanData: TimeSpanData
  @Input() source: GvFieldSourceEntity

  constructor(
    private timeSpan: TimeSpanService
  ) { }

  ngOnInit(): void {
  }


  openTimespanModal() {
    this.timeSpan.openModal(this.timeSpanData, this.source.fkInfo)
  }

}
