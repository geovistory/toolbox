import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TabRow, DatColumn, TColFilter } from '../../../../../../../../src/server/table/interfaces';
import { SysConfig } from 'app/core';

@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
  readonly dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;

  @Input() loading = false;
  @Input() rows$: Observable<TabRow[]>
  @Input() columns$: Observable<{
    display: string,
    value: number,
    datColumn: DatColumn
  }[]>
  @Input() sortBy$: Observable<string | number>;
  @Input() sortDirection$: Observable<'ASC' | 'DESC'>;
  @Input() colFiltersEnabled: boolean;

  @Output() sortChange = new EventEmitter<string>()
  @Output() filterChange = new EventEmitter<{ colName: string, filter: TColFilter | null }>()

  constructor() { }

  ngOnInit() {

  }

  onSortChange(colName: string) {
    this.sortChange.emit(colName)
  }

  onFilterChange(colName: string, filter: TColFilter | null) {
    this.filterChange.emit({ colName, filter })
  }
}
