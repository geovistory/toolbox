import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core/active-project';
import { DfhProperty } from 'app/core/sdk';
import { FactoidControllerService, GetFactoidsFromEntityResponse } from 'app/core/sdk-lb4';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { forEach, groupBy } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { FactoidEntity } from 'app/core/sdk-lb4/model/factoidEntity';


@Component({
  selector: 'gv-factoid-list',
  templateUrl: './factoid-list.component.html',
  styleUrls: ['./factoid-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    QuillOpsToStrPipe
  ]
})
export class FactoidListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  pkProject: number;
  totalLength = 0;
  factoidsEntities: Array<FactoidEntity>
  pageIndex = 0;
  pageSize = 2;
  loading = false;

  constructor(
    public p: ActiveProjectService,
    private factoidService: FactoidControllerService,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
  ) {
  }

  ngOnInit() {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => this.pkProject = pkProject);
    this.askForFactoids();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.askForFactoids();
  }

  askForFactoids() {
    this.factoidsEntities = [];
    this.loading = true;
    this.ref.detectChanges();
    this.factoidService.factoidControllerFactoidsFromEntity(this.pkProject + '', this.pkEntity + '', this.pageSize + '', this.pageIndex + '')
      .pipe(first(), takeUntil(this.destroy$)).subscribe(resp => {
        this.totalLength = resp.totalLength;
        this.factoidsEntities = resp.factoidEntities;
        this.loading = false;
        this.ref.detectChanges();
      })
  }




  stringify(objet: Object) {
    return JSON.stringify(objet);
  }
}
