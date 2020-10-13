import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActiveProjectService } from 'app/core/active-project';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../../server/src/lb3/server/table/interfaces';

export interface ColumnMapping {
  fkClass: number,
  className: string,
  icon: 'teEn' | 'peIt',
}

export interface CellMapping {
  colIndex: number,
  rowIndex: number,
  pkEntity: number
}


@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  // mandatory inputs
  @Input() loading = false;
  @Input() headers$: Observable<{ colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping }[]>;
  @Input() table$: Observable<string[][]>;

  // optionnal inputs
  @Input() filteringEnabled = false;
  @Input() sortingEnabled = false;
  @Input() lineBreak = false;
  @Input() sortBy$: Observable<{ colNb: number, direction: string }>;
  @Input() entityMappings$: Observable<CellMapping[]>;

  // outputs
  @Output() sortDemanded = new EventEmitter<{ colNb: number, direction: string }>();
  @Output() filterDemanded = new EventEmitter<Array<{ col: number, filter: TColFilter }>>();
  @Output() cellClicked = new EventEmitter<{ col: number, row: number }>();
  @Output() cellMapping = new EventEmitter<{ col: number, row: number, pkEntity: number }>()

  // private parameters
  headers: { colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping }[];
  table: string[][] | { text: string, pkEntity: number, score: number }[][];
  entityMappings: number[][];
  curSort: { colNb: number, direction: string };
  filters: Array<{ col: number, value: string }>;

  constructor(
    public p: ActiveProjectService,
    private c: ConfigurationPipesService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.headers = [];
    this.table = [];
    this.curSort = { colNb: -1, direction: '' };
    this.filters = [];

    // listen to input headers (from parent)
    this.headers$.pipe(takeUntil(this.destroy$)).subscribe(headers => {
      this.headers = headers;


      // GMU TODO : to remove when link is done
      this.headers = [
        { colLabel: 'Name', comment: 'the name of the person', type: 'string', mapping: { fkClass: 21, className: 'Person', icon: 'peIt' } },
        { colLabel: 'Birthdates', comment: 'the birthdate of the person', type: 'string' },
      ]
    })

    // listen to input table (from parent)
    this.table$.pipe(takeUntil(this.destroy$))
      .subscribe(table => {
        this.table = table;


        // GMU TODO : to remove when link is done
        this.table = [];
        this.table[0] = [];
        this.table[0][0] = 'Albert IV';
        this.table[0][1] = '1216';
        this.table[1] = [];
        this.table[1][0] = 'Rudolf of Habsbourg';
        this.table[1][1] = '1465';
      });

    // listen to input mappings (from parent)
    if (this.entityMappings$) {
      this.entityMappings$.pipe(takeUntil(this.destroy$))
        .subscribe(mappings => {
          this.entityMappings = [];
          mappings.forEach(m => {
            if (!this.entityMappings[m.rowIndex]) this.entityMappings[m.rowIndex] = [];
            this.entityMappings[m.rowIndex][m.colIndex] = m.pkEntity;
          })
        })
    } else {

      // GMU TODO : to remove when link is done
      this.entityMappings = [];
      this.entityMappings[1] = [];
      this.entityMappings[1][0] = 2005;
    }

    // listen to sortBy option (from parent or from html)
    if (this.sortBy$) this.sortBy$.pipe(takeUntil(this.destroy$)).subscribe(sort => this.curSort = sort);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sort(col: number) {
    if (!this.sortingEnabled) return;

    if (col == this.curSort.colNb) this.curSort.direction = this.curSort.direction == 'ASC' ? 'DESC' : 'ASC'
    else this.curSort = { colNb: col, direction: 'ASC' }

    this.sortDemanded.emit(this.curSort);
  }

  filter(col: number, event: any) {
    if (!this.filteringEnabled) return;

    if (event) {
      if (event.numeric) event.numeric.value = parseFloat(event.numeric.value);
      this.filters[col + ''] = { col: col, filter: event };
    } else this.filters.splice(col, 1);

    this.filterDemanded.emit(Object.keys(this.filters).map(f => this.filters[f]));
  }

  cellClick(row: number, col: number) {
    this.cellClicked.emit({ col: col, row: row });
  }

  // MOVE TO EntityMatcherComponent
  mappingChanged(pkEntity: number, i: number, j: number) {
    this.cellMapping.emit({ col: j, row: i, pkEntity: pkEntity });
  }
}
