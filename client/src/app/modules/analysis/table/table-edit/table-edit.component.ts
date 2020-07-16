import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SysConfig, ActiveProjectService } from 'app/core';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { Subject, of, Observable } from 'rxjs';
import { AnalysisService } from '../../services/analysis.service';
import { TableFormComponent } from '../table-form/table-form.component';
import { QueryDefinition, TableInput, TableOutput } from '../../../../../../../server/src/lb3/common/interfaces'
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  @ViewChild('c', { static: false }) formComponent: TableFormComponent

  initVal$: Observable<QueryDefinition>

  queryDefinition$ = new Subject<QueryDefinition>()

  constructor(
    public a: AnalysisService<TableInput, TableOutput>,
    private ts: TabLayoutService,
    p: ActiveProjectService
  ) {
    if (this.a.pkEntity) {
      this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(
        map(i => i.analysis_definition),
        map((def: TableInput) => def.queryDefinition)
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
