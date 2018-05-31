import { Component, OnInit, EventEmitter, Output } from '@angular/core';


/**
 * A simple component that has a form to create a new source
 * - Output: cancel
 * - Output: submit
 * 
 * User can enter the sources name (temporary in 'notes') 
 * Form returns a new digital object of quill js type  
 * 
 * In future he can also choose the type of source
 *  - quill js, image, reference to object, …
 */
@Component({
  selector: 'gv-source-create-form',
  templateUrl: './source-create-form.component.html',
  styleUrls: ['./source-create-form.component.scss']
})
export class SourceCreateFormComponent implements OnInit {

  @Output() cancel: EventEmitter<void>=new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
