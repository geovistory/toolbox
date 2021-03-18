import { MatTableDataSource } from '@angular/material';
import { Field, Subfield, TemporalEntityItem } from '@kleiolab/lib-queries';
import { indexBy, mapObjIndexed } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';






export class TemporalEntityTable {
  public dataSource = new MatTableDataSource<TemporalEntityItem>();
  // table view
  dataColumnsMap$ = new BehaviorSubject<{ [key: string]: boolean; }>({});
  dataColumns$ = new BehaviorSubject<{ name: string, fieldDefinition: Field }[]>([]);
  displayedColumns$: Observable<string[]>;

  constructor(
    public rows$: Observable<TemporalEntityItem[]>,
    public columDefs$: Observable<Field[]>,
    public destroy$,
    public listDefinition: Subfield,
    customColumns: {
      columnsBefore: string[];
      columnsAfter: string[];
    }
  ) {

    this.displayedColumns$ = this.dataColumnsMap$.pipe(map((dataColumnsMap) => {
      let checked = [];
      for (const key in dataColumnsMap) {
        if (dataColumnsMap[key]) checked.push(key);
      }
      checked = [...customColumns.columnsBefore, ...checked, ...customColumns.columnsAfter];
      if (checked.length === 0) checked.push('_empty_');
      return checked;
    }));
    this.displayedColumns$.pipe(takeUntil(destroy$)).subscribe()

    this.columDefs$.pipe(first(fs => fs.length > 0), takeUntil(destroy$)).subscribe((fieldDefinitions) => {
      const dataColumnsMap = mapObjIndexed((val, key, obj) => true, indexBy((l) => l.label, fieldDefinitions));
      const circularField = fieldDefinitions.find(f => f.property.fkProperty === listDefinition.property.fkProperty);
      if (circularField && circularField.targetMaxQuantity === 1) {
        // hideCircularField
        const circularCol = circularField.label;
        dataColumnsMap[circularCol] = false;
      }
      this.dataColumnsMap$.next(dataColumnsMap);
      const dataColumns = fieldDefinitions.map(fieldDefinition => ({ name: fieldDefinition.label, fieldDefinition }));
      this.dataColumns$.next(dataColumns);
      this.rows$.pipe(takeUntil(this.destroy$)).subscribe((rows) => {
        this.dataSource.data = rows;
      });
    });



  }

  toggleCol(x: string) {
    this.dataColumnsMap$.pipe(first()).subscribe(map => {
      map[x] = !map[x];
      this.dataColumnsMap$.next(map);
    });
  }
}
