import { Component, HostListener } from '@angular/core';
import { EntityEditorService, LoopBackConfig } from './core';
import { NgRedux, select } from '@angular-redux/store';
import { environment } from 'environments/environment';

@Component({
  selector: 'gv-root',
  host: {
    '(window:keydown)': 'keydown($event)',
    '(window:keyup)': 'keyup($event)',
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    private entityEditor: EntityEditorService,
    
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  keydown($event) {
    if ($event.key === 'Alt') {
      // this.entityEditor.showDfhId = true;
    }
  };
  keyup($event) {
    if ($event.key === 'Alt') {
      // this.entityEditor.showDfhId = false;
    }
  };


}