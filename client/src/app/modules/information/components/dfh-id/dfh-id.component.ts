import { Component, OnInit, Input } from '@angular/core';
import { DfhProperty, EntityEditorService } from 'app/core';


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
