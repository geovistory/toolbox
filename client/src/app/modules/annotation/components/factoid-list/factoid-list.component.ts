import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core/active-project';
import { FactoidControllerService } from 'app/core/sdk-lb4';
import { FactoidEntity } from 'app/core/sdk-lb4/model/factoidEntity';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-factoid-list',
  templateUrl: './factoid-list.component.html',
  styleUrls: ['./factoid-list.component.scss'],
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
    this.factoidService.factoidControllerFactoidsFromEntity(this.pkProject + '', this.pkEntity + '', this.pageSize + '', this.pageIndex + '')
      .pipe(first(), takeUntil(this.destroy$)).subscribe(resp => {
        this.totalLength = resp.totalLength;
        this.factoidsEntities = resp.factoidEntities;
        this.loading = false;
      })
  }

  stringify(objet: Object) {
    return JSON.stringify(objet);
  }
}
