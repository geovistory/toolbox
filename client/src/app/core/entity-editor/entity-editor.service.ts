import { Injectable } from '@angular/core';

@Injectable()
export class EntityEditorService {


  /**
  * Properties
  */

  // flag that can be set true when the "Alt" Key is pressed
  devView:boolean = false;

  showDfhId:boolean = false;

  constructor() { }

}
