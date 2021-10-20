import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, SysSelector } from '@kleiolab/lib-queries';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { values } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface MappedColumn {
  pkColumn: number;
  columnName: string;
}

@Component({
  selector: 'gv-column-mapping',
  templateUrl: './column-mapping.component.html',
  styleUrls: ['./column-mapping.component.scss']
})
export class ColumnMappingComponent implements OnInit {
  @Input() pkTable: number;
  @Input() pkClass: number
  @Output() onChange = new EventEmitter<number>();

  classLabel$: Observable<string>
  icon$: Observable<'TeEn' | 'PeIt' | 'VOT'>;
  mappedCols$: Observable<MappedColumn[]>

  selected: MappedColumn;

  constructor(
    public c: ConfigurationPipesService,
    private p: ActiveProjectService,
    private sys: SysSelector,
  ) { }

  ngOnInit(): void {
    // everythings is already in the store, because we only can access this component AFTER loading the table)

    this.classLabel$ = this.c.pipeClassLabel(this.pkClass);

    this.icon$ = combineLatest([
      this.c.pipeClassesEnabledByProjectProfiles(),
      this.sys.config$.main$
    ]).pipe(
      map(([classes, config]) => {
        const basicType = classes.find(c => c.pk_class == this.pkClass)?.basic_type;
        const configOfClass = config.classes[this.pkClass]
        if (basicType == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || basicType == 30) {
          return 'PeIt';
        } else if (configOfClass && configOfClass.valueObjectType) return 'VOT'
        else return 'TeEn'
      })
    )

    const columns$ = this.p.dat$.column$.by_fk_digital$.key(this.pkTable).pipe(map(c => values(c)));

    const mappings$ = columns$.pipe(
      switchMap(cols => combineLatest(
        cols.map(c => this.p.dat$.class_column_mapping$.by_fk_column$.key(c.pk_entity).pipe(
          map(m => values(m)[0])
        ))
      ))
    )

    this.mappedCols$ = mappings$.pipe(
      switchMap(mappings => combineLatest(
        mappings
          .filter(m => !!m)
          .filter(m => m.fk_class == this.pkClass)
          .map(m => this.p.dat$.text_property$.by_fk_entity__fk_system_type$.key(m.pk_entity + '_' + 3295)
            .pipe(map(tp => ({
              columnName: values(tp)[0].string,
              pkColumn: m.fk_column
            })))))
      )
    )
  }

  select(mc: MappedColumn) {
    this.selected = mc;
    this.onChange.emit(mc.pkColumn);
  }

}
