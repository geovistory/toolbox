import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gv-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isNavbarCollapsed:boolean;

  constructor() { }

  ngOnInit() {
  }

}
