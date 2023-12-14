import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'gv-right-panel-btn',
    templateUrl: './right-panel-btn.component.html',
    styleUrls: ['./right-panel-btn.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatDividerModule]
})
export class RightPanelBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
