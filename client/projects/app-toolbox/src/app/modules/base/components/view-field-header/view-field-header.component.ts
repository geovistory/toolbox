import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';


@Component({
  selector: 'gv-view-field-header',
  templateUrl: './view-field-header.component.html',
  styleUrls: ['./view-field-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldHeaderComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() body: ViewFieldBodyComponent
  @Input() itemsCount$: Observable<number>
  @Input() showAddButton$: Observable<boolean>
  @Input() readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() showTargetClassLabels = true
  @Input() itemsMax: number
  @Input() disableToggle: boolean
  @Input() hideItemsCount: boolean
  @Input() ontoInfoUrl: string
  @Input() ontoInfoLabel: string
  @Input() fieldLabel: string
  @Input() targetClassLabels: string[]
  @Input() required: boolean
  @Input() removedFromProfiles: boolean
  @Input() displayMode: 'flat' | 'tree' = 'flat' // tree mode: looks like a node in a tree
  @Input() indentation$ = new BehaviorSubject(0)
  @Output() add = new EventEmitter<void>()

  pl$: Observable<number>

  itemMaxStr: string
  targetClassLabelsStr: string
  targetClassLabelsTooltip: string
  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.displayMode === 'tree' && this.indentation$) {
      this.pl$ = this.indentation$.pipe(map(indentation => 8 + (indentation * 40)))
    } else {
      this.pl$ = of(16)
    }
    this.itemMaxStr = this.itemsMax == -1 ? 'n' : this.itemsMax.toString()

    if (this.targetClassLabels.length > 1) this.targetClassLabelsTooltip = `Related classes: ${this.targetClassLabels.join(' / ')}`
    else this.targetClassLabelsTooltip = `Related class: ${this.targetClassLabels?.[0]}`

    if (this.targetClassLabels.length > 3) this.targetClassLabelsStr = `${this.targetClassLabels.slice(0, 3).join(' / ')} / + ${this.targetClassLabels.length - 3} more ...`
    else this.targetClassLabelsStr = this.targetClassLabels.join(' / ')

  }

  toggle() {
    this.body.showBody$.next(!this.body.showBody$.value)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
