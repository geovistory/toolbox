import { indexBy, mapObjIndexed } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '../../../../../../node_modules/@angular/material';
import { first, map, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { FieldDefinition, TemporalEntityItem, TemporalEntityTableI } from '../properties-tree/properties-tree.models';



export class TemporalEntityTable {
  public dataSource = new MatTableDataSource<TemporalEntityItem>();
  // table view
  dataColumnsMap$ = new BehaviorSubject<{ [key: string]: boolean; }>({});
  dataColumns$ = new BehaviorSubject<string[]>([]);
  displayedColumns$: Observable<string[]>;

  constructor(public rows$: Observable<TemporalEntityItem[]>, public columDefs$: Observable<FieldDefinition[]>, public destroy$, public listDefinition, customColumns: {
    columnsBefore: string[];
    columnsAfter: string[];
  }) {

    this.displayedColumns$ = this.dataColumnsMap$.pipe(map((dataColumnsMap) => {
      let checked = [];
      for (const key in dataColumnsMap) {
        if (dataColumnsMap[key])
          checked.push(key);
      }
      checked = [...customColumns.columnsBefore, ...checked, ...customColumns.columnsAfter];
      if (checked.length === 0)
        checked.push('_empty_');
      return checked;
    }));
    this.displayedColumns$.pipe(takeUntil(destroy$)).subscribe()

    this.columDefs$.pipe(first(fs => fs.length > 0), takeUntil(destroy$)).subscribe((fieldDefinitions) => {
      const dataColumnsMap = mapObjIndexed((val, key, obj) => true, indexBy((l) => l.label, fieldDefinitions));
      const circularField = fieldDefinitions.find(f => f.pkProperty === listDefinition.fkPropertyOfOrigin);
      if (circularField) {
        // hideCircularField
        const circularCol = circularField.label;
        dataColumnsMap[circularCol] = false;
      }
      this.dataColumnsMap$.next(dataColumnsMap);
      this.dataColumns$.next(Object.keys(dataColumnsMap));
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
