import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldPageScope, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../../modules/base/services/edit-mode.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-view-field-item-layout',
    templateUrl: './view-field-item-layout.component.html',
    styleUrls: ['./view-field-item-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, MatCheckboxModule, MatRadioModule, AsyncPipe]
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
