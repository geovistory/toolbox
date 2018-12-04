import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gv-field-header',
  templateUrl: './field-header.component.html',
  styleUrls: ['./field-header.component.scss']
})
export class FieldHeaderComponent implements OnInit {

  @Input() property$;
  @Input() label$;
  @Input() toggle$;
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() removePropertyFieldBtnVisible;
  @Input() toggleButtonVisible;
  @Input() rolesCount;

  @Output() toggleCardBody = new EventEmitter<void>()
  @Output() startAddingRole = new EventEmitter<void>()
  @Output() removePropertyField = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

}
