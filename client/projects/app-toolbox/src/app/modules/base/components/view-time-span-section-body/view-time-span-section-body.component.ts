import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openClose } from '../../../information/shared/animations';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';

@Component({
  selector: 'gv-view-time-span-section-body',
  templateUrl: './view-time-span-section-body.component.html',
  styleUrls: ['./view-time-span-section-body.component.scss'],
  animations: [openClose],
})
export class ViewTimeSpanSectionBodyComponent implements OnInit {
  showBody$ = new BehaviorSubject(true);

  @Input() section: ViewSectionBodyComponent

  constructor() { }

  ngOnInit(): void {
  }

}
