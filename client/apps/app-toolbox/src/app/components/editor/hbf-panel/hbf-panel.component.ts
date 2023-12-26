import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-hbf-panel',
    templateUrl: './hbf-panel.component.html',
    styleUrls: ['./hbf-panel.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class HbfPanelComponent implements OnInit {

  @Input() header = true
  @Input() footer = true

  constructor() { }

  ngOnInit(): void {
  }

}
