import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'gv-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss'],
  standalone: true
})
export class DetailContentComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // @HostBinding('class.gv-flex-fh') fh = true;
  @HostBinding('class.gv-scroll-y-container') scroll = true;

}
