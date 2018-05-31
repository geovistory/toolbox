import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InfDigitalObject, InfEntityProjectRel } from 'app/core';
import { QuillDoc } from 'app/modules/quill';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import * as Delta from 'quill-delta/lib/delta';

/**
 * A simple component that has a form to create a new source
 * - Input: projectPk
 * - Output: cancel
 * - Output: submit
 * 
 * User can enter the sources name (temporary in 'notes') 
 * 
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

  @Input() projectPk: number;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() ok: EventEmitter<InfDigitalObject> = new EventEmitter();

  model: { label?: string } = {};

  constructor() { }

  ngOnInit() {
  }

  /**
   * Creates a instance of InfDigitalObject with
   * with a QuillDock
   *  
   */
  onSubmit() {

    // create a new digital object
    const dObj = {
      // temporary putting the name of the source in 'notes'
      notes: this.model.label,

      // create a new QuillDoc
      js_quill_data: {
        latestId: 0,
        contents: new Delta()
      } as QuillDoc,

      // // create a epr
      // entity_version_project_rels: [
      //   {
      //     fk_project: this.projectPk,
      //     is_in_project: true
      //   } as InfEntityProjectRel
      // ]
    } as InfDigitalObject

    this.ok.emit(dObj)
  }
}
