import { Component, HostListener} from '@angular/core';
import { KeyboardService } from './shared/services/keyboard.service';

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

  constructor(private keybord: KeyboardService){

  }

  keydown($event) {
    if($event.key === 'Alt'){      
      this.keybord.altPressed = true;
    }
  };
  keyup($event) {
    if($event.key === 'Alt'){
      this.keybord.altPressed = false;
    }
  };

}