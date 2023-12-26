import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DfhConfig } from '@kleiolab/lib-config';
import { InformationPipesService } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageScope, GvFieldSourceEntity, GvFieldTargetViewType, WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { DateTimeModule } from '../../../../../../../libs/lib-utils/src/lib/date-time/date-time.module';
import { TimeSpanData, TimeSpanFieldPages } from '../../../services/time-span.service';

@Component({
  selector: 'gv-view-time-span-item-preview',
  templateUrl: './view-time-span-item-preview.component.html',
  styleUrls: ['./view-time-span-item-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, AsyncPipe, DateTimeModule]
})
export class ViewTimeSpanItemPreviewComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() source: GvFieldSourceEntity
  @Input() scope: GvFieldPageScope

  timeSpan$: Observable<TimeSpanData>
  timeSpanPreview$: Observable<WarEntityPreviewTimeSpan>
  @Output() timeSpanPreviewChange = new EventEmitter<WarEntityPreviewTimeSpan>()

  constructor(
    private i: InformationPipesService,
  ) { }

  ngOnInit(): void {

    this.timeSpan$ = this.pipeTimeSpan().pipe(shareReplay())

    this.timeSpanPreview$ = this.timeSpan$.pipe(map(ts => ts.preview))
    this.timeSpanPreview$.pipe(takeUntil(this.destroy$)).subscribe(v => this.timeSpanPreviewChange.emit(v))

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private pipeTimeSpan(): Observable<TimeSpanData> {

    // for each of these subfields
    const subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
      .map(fkProperty => {
        const page: GvFieldPage = {
          property: { fkProperty },
          isOutgoing: true,
          limit: 1,
          offset: 0,
          source: this.source,
          scope: this.scope,
        }
        const subfType: GvFieldTargetViewType = {
          timePrimitive: 'true'
        }
        const trgts = {
          [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: subfType
        }
        return this.i.pipeFieldPage(page, trgts, false).pipe(
          map(({ count, statements }) => {
            const p: TimeSpanFieldPages = {
              fieldId: {
                isOutgoing: page.isOutgoing,
                property: page.property,
                scope: page.scope,
                source: page.source
              },
              count,
              statements
            }
            return p
          })
        )
      })
    const all$ = combineLatestOrEmpty(subentityPages$);


    return all$.pipe(
      map(
        subfields => {
          const preview: WarEntityPreviewTimeSpan = {}
          subfields.forEach(s => {
            if (s.statements[0]) {
              const st = s.statements[0]
              const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property]
              preview[key] = st.target.timePrimitive.timePrimitive
            }
          })
          const res: TimeSpanData = {
            subfields,
            preview
          }
          return res
        }
      )
    )
  }

}
