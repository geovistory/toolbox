import { Component, Input, OnInit } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gv-entity-field-time-span',
  templateUrl: './entity-field-time-span.component.html',
  styleUrls: ['./entity-field-time-span.component.scss']
})
export class EntityFieldTimeSpanComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() source: GvFieldSourceEntity
  @Input() scope: GvFieldPageScope
  constructor(
    private p: ActiveProjectPipesService,
    private pag: PaginationService,
  ) { }

  ngOnInit(): void {
    this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

      const reqs = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map(
        fkProperty => {
          const req: GvFieldPageReq = {
            page: {
              isOutgoing: true,
              limit: 1,
              offset: 0,
              property: { fkProperty },
              scope: this.scope,
              source: this.source
            },
            pkProject,
            targets: {
              [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: {
                timePrimitive: 'true',
              }
            }
          }
          return req
        }
      )
      for (const req of reqs) {
        this.pag.listenToPageUpdates(req, this.destroy$);
      }
    })
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
