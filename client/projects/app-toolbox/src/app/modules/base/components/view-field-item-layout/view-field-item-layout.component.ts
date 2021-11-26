import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, StatementWithTarget } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-view-field-item-layout',
  templateUrl: './view-field-item-layout.component.html',
  styleUrls: ['./view-field-item-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemLayoutComponent implements OnInit {


  @Input() item: StatementWithTarget
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>
  @Input() field: Field
  @Input() scope: GvFieldPageScope

  @Input() allowMultiSelect: boolean;
  @Input() checked: boolean
  @Output() selectionChange = new EventEmitter<StatementWithTarget>()

  constructor() { }

  ngOnInit(): void {
  }

}
