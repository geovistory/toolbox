import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { InfLanguage } from 'app/core';

@Component({
  selector: 'gv-language-view',
  templateUrl: './language-view.component.html',
  styleUrls: ['./language-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LanguageViewComponent {

  @Input() language: InfLanguage;

}
