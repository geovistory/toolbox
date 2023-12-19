import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SysConfig } from "@kleiolab/lib-config";
import { StateFacade } from '@kleiolab/lib-redux';
import { AnalysisTableRequest, AnalysisTableResponse, QueryDefinition } from "@kleiolab/lib-sdk-lb4";
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalysisLayoutComponent } from '../../../../components/analysis/layout/analysis-layout/analysis-layout.component';
import { GvAnalysisService } from '../../../../services/analysis.service';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { ResultTableComponent } from '../../../queries/components/result-table/result-table.component';
import { TableFormComponent } from '../table-form/table-form.component';

@Component({
  selector: 'gv-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
  standalone: true,
  imports: [
    AnalysisLayoutComponent,
    TableFormComponent,
    MatButtonModule,
    MatTooltipModule,
    ResultTableComponent,
    AsyncPipe,
  ],
})
export class TableEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  @ViewChild('c') formComponent: TableFormComponent

  initVal$: Observable<QueryDefinition>

  queryDefinition$ = new Subject<QueryDefinition>()

  constructor(
    public a: GvAnalysisService<AnalysisTableRequest, AnalysisTableResponse>,
    private ts: TabLayoutService,
    private state: StateFacade
  ) {
    if (this.a.pkEntity) {
      this.initVal$ = state.data.pro.analysis.getAnalysis.byPkEntity$(this.a.pkEntity).pipe(
        map(i => i.analysis_definition),
        map((def) => def.queryDefinition)
      )
    }

    this.a.registerRunAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.queryDefinition$.next(q.queryDefinition)
        this.ts.t.setLayoutMode('both');
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    }, SysConfig.PK_ANALYSIS_TYPE__TABLE)

    this.a.registerCreateAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCreateApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerSaveAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callSaveApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    })

    this.a.registerCopyAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCopyApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerRenameAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callRenameApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        of()
      }
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
