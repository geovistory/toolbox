import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

interface MappedColumn {
  pkColumn: number;
  columnName: string;
  icon$: Observable<string>;
  className$: Observable<string>;
  klass: number;
}

@Component({
    selector: 'gv-column-mapping',
    templateUrl: './column-mapping.component.html',
    styleUrls: ['./column-mapping.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, MatIconModule, AsyncPipe]
})
export class ColumnMappingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkColumn: number; // init val
  @Input() pkTable: number;
  @Input() pkTargetClasses$: Observable<Array<number>>
  @Input() disabled: boolean = false

  @Output() onChange = new EventEmitter<number>();
  @Output() outputClass = new EventEmitter<number>();

  icon$: Observable<'TeEn' | 'PeIt' | 'VOT'>;
  mappedCols$: Observable<MappedColumn[]>
  noMappings$ = new BehaviorSubject(true);
  targetClassLabels$: Observable<Array<string>>;

  selected: MappedColumn;

  constructor(
    public c: ConfigurationPipesService,
    private state: StateFacade,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    // everythings is already in the store, because we only can access this component AFTER loading the table)

    const columns$ = this.state.data.dat.column.getColumn.byFkDigital$(this.pkTable).pipe(map(c => values(c)));

    const mappings$ = columns$.pipe(
      switchMap(cols => combineLatest(
        cols.map(c => this.state.data.dat.classColumnMapping.getClassColumnMapping.byFkColumn$(c.pk_entity).pipe(
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
          .map(m => this.state.data.dat.textProperty.getTextProperty.byFkEntityAndSysType$(m.fk_column, 3295)
            .pipe(map(tp => ({
              columnName: values(tp)[0]?.string,
              pkColumn: m.fk_column,
              className$: this.c.pipeClassLabel(m.fk_class),
              icon$: this.getIcon$(m.fk_class),
              klass: m.fk_class
            }))))
      ))
    )

    this.mappedCols$.pipe(takeUntil(this.destroy$)).subscribe(x => this.noMappings$.next(false))

    if (this.pkColumn) {
      this.mappedCols$.pipe(takeUntil(this.destroy$)).subscribe(cols => {
        cols.forEach(col => {
          if (col.pkColumn == this.pkColumn) {
            this.selected = col;
            this.outputClass.emit(col.klass); // inform what class the column is
          }
        })
      })
    }

    this.targetClassLabels$ = this.pkTargetClasses$.pipe(
      switchMap(cs => combineLatest(cs.map(c => this.c.pipeClassLabel(c))))
    )
  }

  getIcon$(pkClass: number): Observable<'PeIt' | 'VOT' | 'TeEn'> {
    return combineLatest([
      this.c.pipeClassesEnabledByProjectProfiles(),
      this.state.data.sys.config.sysConfig$
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
    this.outputClass.emit(mc.klass);
  }

}
