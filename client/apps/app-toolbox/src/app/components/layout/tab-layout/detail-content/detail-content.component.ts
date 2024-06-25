import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'gv-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss'],
  standalone: true
})
export class DetailContentComponent {
  // @HostBinding('class.gv-flex-fh') fh = true;
  @HostBinding('class.gv-scroll-y-container') scroll = true;

}
