import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'gv-detail-top-bar',
  templateUrl: './detail-top-bar.component.html',
  styleUrls: ['./detail-top-bar.component.scss']
})
export class DetailTopBarComponent implements OnInit {

  @HostBinding('class.gv-flex-shrink-0') noshrink = true;

  constructor() { }

  ngOnInit() {
  }

}
