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
    
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  keydown($event) {
    if ($event.key === 'Alt') {
    }
  };
  keyup($event) {
    if ($event.key === 'Alt') {
    }
  };


}