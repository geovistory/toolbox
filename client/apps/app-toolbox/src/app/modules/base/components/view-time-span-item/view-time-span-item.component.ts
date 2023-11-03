import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';

@Component({
  selector: 'gv-view-time-span-item',
  templateUrl: './view-time-span-item.component.html',
  styleUrls: ['./view-time-span-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTimeSpanItemComponent implements OnInit {
  @Input() section: ViewSectionBodyComponent

  constructor() { }

  ngOnInit(): void {
  }
  toggleBody() {
    this.section.showBody$.next(!this.section.showBody$.value)
  }
}
