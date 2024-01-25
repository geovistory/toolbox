import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gv-hbf-panel',
  templateUrl: './hbf-panel.component.html',
  styleUrls: ['./hbf-panel.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class HbfPanelComponent {

  @Input() header = true
  @Input() footer = true
}
