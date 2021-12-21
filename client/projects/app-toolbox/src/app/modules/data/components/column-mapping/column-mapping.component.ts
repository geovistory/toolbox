import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, SysSelector } from '@kleiolab/lib-queries';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { values } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

interface MappedColumn {
  pkColumn: number;
  columnName: string;
  icon$: Observable<string>;
  className$: Observable<string>;
}

@Component({
  selector: 'gv-column-mapping',
  templateUrl: './column-mapping.component.html',
  styleUrls: ['./column-mapping.component.scss']
})
export class ColumnMappingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkColumn: number; // init val
  @Input() pkTable: number;
  @Input() pkTargetClasses$: Observable<Array<number>>
  @Input() disabled: boolean = false

  @Output() onChange = new EventEmitter<number>();

  icon$: Observable<'TeEn' | 'PeIt' | 'VOT'>;
  mappedCols$: Observable<MappedColumn[]>

  selected: MappedColumn;

  constructor(
    public c: ConfigurationPipesService,
    private p: ActiveProjectService,
    private sys: SysSelector,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    // everythings is already in the store, because we only can access this component AFTER loading the table)

    const columns$ = this.p.dat$.column$.by_fk_digital$.key(this.pkTable).pipe(map(c => values(c)));

    const mappings$ = columns$.pipe(
      switchMap(cols => combineLatest(
        cols.map(c => this.p.dat$.class_column_mapping$.by_fk_column$.key(c.pk_entity).pipe(
          map(m => values(m)[0])
        ))
      ))
    )

    this.mappedCols$ = combineLatest([
      mappings$,
      this.pkTargetClasses$
    ]).pipe(
      switchMap(([mappings, classes]) => combineLatest(
        mappings
          .filter(m => !!m)
          .filter(m => classes?.some(c => c == m.fk_class))
          .map(m => this.p.dat$.text_property$.by_fk_entity__fk_system_type$.key(m.fk_column + '_' + 3295)
            .pipe(map(tp => ({
              columnName: values(tp)[0]?.string,
              pkColumn: m.fk_column,
              className$: this.c.pipeClassLabel(m.fk_class),
              icon$: this.getIcon$(m.fk_class)
            }))))
      ))
    )

    if (this.pkColumn) {
      this.mappedCols$.pipe(takeUntil(this.destroy$)).subscribe(cols => {
        cols.forEach(col => {
          if (col.pkColumn == this.pkColumn) this.selected = col
        })
      })
    }
  }

  getIcon$(pkClass: number): Observable<'PeIt' | 'VOT' | 'TeEn'> {
    return combineLatest([
      this.c.pipeClassesEnabledByProjectProfiles(),
      this.sys.config$.main$
    ]).pipe(
      map(([classes, config]) => {
        const basicType = classes.find(c => c.pk_class == pkClass)?.basic_type;
        const configOfClass = config.classes[pkClass]
        if (basicType == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || basicType == 30) {
          return 'PeIt';
        } else if (configOfClass && configOfClass.valueObjectType) return 'VOT'
        else return 'TeEn'
      })
    )
  }

  select(mc: MappedColumn) {
    this.selected = mc;
    this.onChange.emit(mc.pkColumn);
  }

}
