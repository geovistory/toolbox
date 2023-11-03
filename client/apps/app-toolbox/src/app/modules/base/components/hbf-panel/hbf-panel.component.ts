import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gv-hbf-panel',
  templateUrl: './hbf-panel.component.html',
  styleUrls: ['./hbf-panel.component.scss']
})
export class HbfPanelComponent implements OnInit {

  @Input() header = true
  @Input() footer = true

  constructor() { }

  ngOnInit(): void {
  }

}
