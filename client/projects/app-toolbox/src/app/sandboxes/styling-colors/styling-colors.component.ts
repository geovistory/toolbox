import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gv-styling-colors',
  templateUrl: './styling-colors.component.html',
  styleUrls: ['./styling-colors.component.scss']
})
export class StylingColorsComponent implements OnInit {

  constructor() { }
  shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  ngOnInit(): void {
  }

}
