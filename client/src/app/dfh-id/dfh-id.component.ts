import { Component, OnInit, Input } from '@angular/core';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';

@Component({
  selector: 'gv-dfh-id',
  templateUrl: './dfh-id.component.html',
  styleUrls: ['./dfh-id.component.scss']
})
export class DfhIdComponent implements OnInit {

  // dfh_identifier_in_namespace
  @Input() property:DfhProperty;

  constructor(
    public entityEditor:EntityEditorService
  ) { }

  ngOnInit() {
  }

}
