import { Component, OnInit, Input } from '@angular/core';
import { InfLanguage } from 'app/core';

@Component({
  selector: 'gv-language-view',
  templateUrl: './language-view.component.html',
  styleUrls: ['./language-view.component.scss']
})
export class LanguageViewComponent {

  @Input() language: InfLanguage;

}
