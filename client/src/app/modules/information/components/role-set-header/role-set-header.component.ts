import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gv-role-set-header',
  templateUrl: './role-set-header.component.html',
  styleUrls: ['./role-set-header.component.scss']
})
export class RoleSetHeaderComponent implements OnInit {

  @Input() property$;
  @Input() label$;
  @Input() toggle$;
  @Input() ontoInfoVisible$;
  @Input() addButtonVisible;
  @Input() removeRoleSetBtnVisible;
  @Input() toggleButtonVisible;
  @Input() rolesCount;

  @Output() toggleCardBody = new EventEmitter<void>()
  @Output() startAddingRole = new EventEmitter<void>()
  @Output() removeRoleSet = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

}
