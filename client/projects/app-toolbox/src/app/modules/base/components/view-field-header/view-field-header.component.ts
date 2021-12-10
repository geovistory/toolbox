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
  @Input() itemsMax: number
  @Input() disableToggle: boolean
  @Input() hideItemsCount: boolean
  @Input() ontoInfoUrl: string
  @Input() ontoInfoLabel: string
  @Input() fieldLabel: string
  @Input() targetClassLabels: string[]
  @Input() required: boolean
  @Input() removedFromProfiles: boolean
  @Output() add = new EventEmitter<void>()

  itemMaxStr: string
  targetClassLabelsStr: string
  targetClassLabelsTooltip: string
  constructor() { }

  ngOnInit(): void {
    this.itemMaxStr = this.itemsMax == -1 ? 'n' : this.itemsMax.toString()

    if (this.targetClassLabels.length > 1) this.targetClassLabelsTooltip = `Related classes: ${this.targetClassLabels.join(' / ')}`
    else this.targetClassLabelsTooltip = `Related class: ${this.targetClassLabels?.[0]}`

    if (this.targetClassLabels.length > 3) this.targetClassLabelsStr = `${this.targetClassLabels.slice(0, 3).join(' / ')} / + ${this.targetClassLabels.length - 3} more ...`
    else this.targetClassLabelsStr = this.targetClassLabels.join(' / ')

  }

  toggle() {
    this.body.showBody$.next(!this.body.showBody$.value)
  }
}
