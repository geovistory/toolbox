import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../../services/edit-mode.service';
import type { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';


@Component({
  selector: 'gv-view-field-header',
  templateUrl: './view-field-header.component.html',
  styleUrls: ['./view-field-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, NgClass, NgIf, MatButtonModule, MatIconModule, MatTooltipModule, AsyncPipe]
})
export class ViewFieldHeaderComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() body: ViewFieldBodyComponent
  @Input() itemsCount$: Observable<number>
  @Input() showAddButton$: Observable<boolean>
  readmode$: Observable<boolean>
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
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

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
