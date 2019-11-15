import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SysConfig } from 'app/core';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { Subject } from 'rxjs';
import { AnalysisService } from '../../services/analysis.service';
import { TableFormComponent } from '../table-form/table-form.component';
import { QueryDefinition, TableInput, TableOutput } from '../../../../../../../src/common/interfaces'

@Component({
  selector: 'gv-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
  providers: [AnalysisService]
})
export class TableEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  @ViewChild('c', { static: false }) formComponent: TableFormComponent

  queryDefinition$ = new Subject<QueryDefinition>()

  constructor(
    private c: ConfigurationPipesService,
    public a: AnalysisService<TableInput, TableOutput>,
    private ts: TabLayoutService
  ) {

    this.ts.t.setTabTitle('New Analysis *')

    this.a.registerRunAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.queryDefinition$.next(q.queryDefinition)
        this.ts.t.setShowRightArea(true);
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    }, SysConfig.PK_ANALYSIS_TYPE__TABLE)
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
