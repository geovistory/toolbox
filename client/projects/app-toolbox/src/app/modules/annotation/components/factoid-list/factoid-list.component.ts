import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectPipesService, ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { SchemaService } from '@kleiolab/lib-redux';
import { FactoidControllerService, FactoidEntity, FactoidStatement, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { InfTimePrimitiveWithCalendar } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ValueObjectTypeName } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { InfValueObjectType } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/value-matcher/value-matcher.component';
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { values } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';


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
    private ap: ActiveProjectPipesService,
    private factoidService: FactoidControllerService,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    private sss: SchemaSelectorsService,
    private s: SchemaService,
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
    this.factoidService
      .factoidControllerFactoidsFromEntity(this.pkProject + '', this.pkEntity + '', this.pageSize + '', this.pageIndex + '')
      .pipe(first(), takeUntil(this.destroy$)).subscribe(resp => {
        this.s.storeSchemaObjectGv(resp.schemaObject, this.pkProject);
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
      this.p.dfh$.property$.by_pk_property$.key(bodyStatement.fkProperty),
      this.p.sys$.config$.main$
    ]).pipe(
      map(([byPk_property, config]) => {
        if (!byPk_property) return undefined;
        const property = values(byPk_property)[0];
        const theClass = bodyStatement.isOutgoing ? property.has_range : property.has_domain;
        return config.classes[theClass] ? config.classes[theClass].valueObjectType : undefined;
      })
    )
  }

  getValueVOT$(bodyStatement: FactoidStatement): Observable<InfValueObjectType> {
    if (bodyStatement.vot == ValueObjectTypeName.appellation) return this.p.inf$.appellation$.by_pk_entity$.key(bodyStatement.pkEntity)
    if (bodyStatement.vot == ValueObjectTypeName.place) return this.p.inf$.place$.by_pk_entity$.key(bodyStatement.pkEntity)
    if (bodyStatement.vot == ValueObjectTypeName.dimension) return this.p.inf$.dimension$.by_pk_entity$.key(bodyStatement.pkEntity)
    if (bodyStatement.vot == ValueObjectTypeName.langString) return this.p.inf$.lang_string$.by_pk_entity$.key(bodyStatement.pkEntity)
    if (bodyStatement.vot == ValueObjectTypeName.language) return this.p.inf$.language$.by_pk_entity$.key(bodyStatement.pkEntity)
    if (bodyStatement.vot == ValueObjectTypeName.timePrimitive) {
      return combineLatest([
        this.p.inf$.time_primitive$.by_pk_entity$.key(bodyStatement.pkEntity),
        this.sss.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(this.pkProject + '_' + bodyStatement.pkStatement)
      ]).pipe(
        map(([tp, ipr]) => {
          if (!ipr) return {} as InfTimePrimitiveWithCalendar
          return {
            ...tp,
            calendar: ipr.calendar
          } as InfTimePrimitiveWithCalendar
        }))
    }
  }

}
