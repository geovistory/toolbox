import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'gv-col-icon-time',
  templateUrl: './col-icon-time.component.html',
  styleUrls: ['./col-icon-time.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule]
})
export class ColIconTimeComponent {
  @HostBinding('class.d-inline') dInline = true;

}
