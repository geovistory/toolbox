import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gv-category-colors',
  templateUrl: './category-colors.component.html',
  styleUrls: ['./category-colors.component.scss']
})
export class CategoryColorsComponent implements OnInit {

  constructor() { }
  shades = ['primary', 'secondary', 'light']
  categories = ['digitals', 'sources', 'entities', 'analysis', 'stories', 'values']
  ngOnInit(): void {
  }

}
