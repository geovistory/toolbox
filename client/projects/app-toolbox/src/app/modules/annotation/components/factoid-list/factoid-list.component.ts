import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { FactoidEntity, FactoidStatement, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ValueObjectTypeName } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { values } from 'ramda';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';


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
  pageSize = 10;
  loading = false;

  constructor(
    public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
    public state: StateFacade
  ) {
  }

  ngOnInit() {
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => this.pkProject = pkProject);
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
    this.state.data.getFactoids(this.pkProject, this.pkEntity, this.pageSize, this.pageIndex)
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

  getVOT$(bodyStatement: FactoidStatement): Observable<SysConfigValueObjectType> {
    return combineLatest([
      this.state.data.dfh.property.getDfhProperty.byProperty(bodyStatement.fkProperty),
      this.state.data.sys.config.sysConfig$
    ]).pipe(
      map(([byPk_property, config]) => {
        if (!byPk_property) return undefined;
        const property = values(byPk_property)[0];
        const theClass = bodyStatement.isOutgoing ? property.has_range : property.has_domain;
        return config.classes[theClass] ? config.classes[theClass].valueObjectType : undefined;
      })
    )
  }

  getValueVOT$(bodyStatement: FactoidStatement, isDefault?: boolean): Observable<InfValueObject> {
    if (bodyStatement.vot == ValueObjectTypeName.appellation) {
      return this.state.data.inf.appellation.getAppellation.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ appellation: value })))
    }
    if (bodyStatement.vot == ValueObjectTypeName.place) {
      return this.state.data.inf.place.getPlace.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ place: value })))
    }
    if (bodyStatement.vot == ValueObjectTypeName.dimension) {
      return this.state.data.inf.dimension.getDimension.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ dimension: value })))
    }
    if (bodyStatement.vot == ValueObjectTypeName.langString) {
      return this.state.data.inf.langString.getLangString.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ langString: value })))
    }
    if (bodyStatement.vot == ValueObjectTypeName.language) {
      return this.state.data.inf.language.getLanguage.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ language: value })))
    }
    if (bodyStatement.vot == ValueObjectTypeName.timePrimitive) {
      return this.state.data.inf.timePrimitive.getTimePrimitive.byPkEntity$(isDefault ? bodyStatement.fkDefault : bodyStatement.pkEntity).pipe(switchMap(value => of({ timePrimitive: value })))
    }
  }

  pipeClassLabel(classId: number) {
    return this.state.data.dfh.label.getDfhLabel.byClass(classId, 'label')
  }
}
