import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gv-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() language;

  constructor() { }

  ngOnInit() {
  }

}
