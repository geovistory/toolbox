import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Subject } from 'rxjs';
import { DatDigitalApi, ActiveProjectService } from 'app/core';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() basePath: string[];

  // Primary key of the text digital to be viewed or edited
  @Input() pkEntity: number;

  t: TabLayout;

  rows$

  constructor(
    public ref: ChangeDetectorRef,
    private digitalApi: DatDigitalApi,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.rows$ = this.digitalApi.getTablePage(pkProject, this.pkEntity, {
        columns: [24626664, 24626666]
      })

    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
