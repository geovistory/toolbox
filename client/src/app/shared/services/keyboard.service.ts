import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardService {


  /**
  * Properties
  */

  // flag that can be set true when the "Alt" Key is pressed
  altPressed:boolean = false;

  constructor() { }

}
