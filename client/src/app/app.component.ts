import { Component, HostListener} from '@angular/core';
import { EntityEditorService } from './core';

@Component({
  selector: 'gv-root',
  host: {
    '(window:keydown)': 'keydown($event)',
    '(window:keyup)': 'keyup($event)'
   },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private entityEditor: EntityEditorService){

  }

  keydown($event) {
    if($event.key === 'Alt'){
      // this.entityEditor.showDfhId = true;
    }
  };
  keyup($event) {
    if($event.key === 'Alt'){
      // this.entityEditor.showDfhId = false;
    }
  };

}