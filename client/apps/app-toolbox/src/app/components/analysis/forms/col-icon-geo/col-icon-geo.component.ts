import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'gv-col-icon-geo',
  templateUrl: './col-icon-geo.component.html',
  styleUrls: ['./col-icon-geo.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule]
})
export class ColIconGeoComponent { }
