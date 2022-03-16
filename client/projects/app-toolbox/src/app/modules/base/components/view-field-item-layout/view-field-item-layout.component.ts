import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, StatementWithTarget } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../services/edit-mode.service';

@Component({
  selector: 'gv-view-field-item-layout',
  templateUrl: './view-field-item-layout.component.html',
  styleUrls: ['./view-field-item-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemLayoutComponent implements OnInit {


  @Input() item: StatementWithTarget
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>
  @Input() field: Field
  @Input() scope: GvFieldPageScope

  @Input() allowMultiSelect: boolean;
  @Input() checked: boolean
  @Output() selectionChange = new EventEmitter<StatementWithTarget>()

  constructor(
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit(): void {
  }

}
