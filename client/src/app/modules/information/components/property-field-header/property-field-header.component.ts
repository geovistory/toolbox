import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gv-property-field-header',
  templateUrl: './property-field-header.component.html',
  styleUrls: ['./property-field-header.component.scss']
})
export class PropertyFieldHeaderComponent implements OnInit {

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
