import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';

@Component({
  selector: 'gv-view-field-header',
  templateUrl: './view-field-header.component.html',
  styleUrls: ['./view-field-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldHeaderComponent implements OnInit {

  @Input() body: ViewFieldBodyComponent
  @Input() itemsCount$: Observable<number>
  @Input() showAddButton$: Observable<boolean>
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() disableToggle: boolean
  @Input() hideItemsCount: boolean
  @Input() ontoInfoUrl: string
  @Input() ontoInfoLabel: string
  @Input() fieldLabel: string
  @Input() required: boolean
  @Input() removedFromProfiles: boolean
  @Output() add = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.body.showBody$.next(!this.body.showBody$.value)
  }
}
