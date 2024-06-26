import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'gv-list-drawer-header',
    templateUrl: './list-drawer-header.component.html',
    styleUrls: ['./list-drawer-header.component.scss'],
    standalone: true,
    imports: [MatDividerModule]
})
export class ListDrawerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
