import { AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnNames, InfLanguage, TableConfig, TableConfigCol } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { clone, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

export interface TableConfigDialogData {
  pkDigital: number
}
export interface TableConfigDialogResult {
  cols: ColumnNames
}

export interface DisplayColumn {
  pkColumn: number,
  visible: boolean,
  name: string,
  type: 'string' | 'number',
  position: number
}

@Component({
  selector: 'gv-table-config-dialog',
  templateUrl: './table-config-dialog.component.html',
  styleUrls: ['./table-config-dialog.component.scss']
})
export class TableConfigDialogComponent implements OnInit, OnDestroy, AfterViewChecked {
  destroy$ = new Subject<boolean>();
  @ViewChild('scrollContainer', { static: true }) private scrollContainer: ElementRef;
  putAtBottom: Boolean = false;

  // config from the store
  tableConfig$: Observable<TableConfig>;
  tableConfig: TableConfig;

  // updates on columns
  updates: Array<DisplayColumn> = [];
  newColIndex = -1;

  // for html
  filter$ = new BehaviorSubject<string>('');
  filterIsOn: Boolean = false;
  editColumn: number;
  defaultLanguage: InfLanguage;

  // column to display
  aggregated$: Observable<Array<DisplayColumn>>;
  aggregated: Array<DisplayColumn>;

  // all columns
  columns: Array<DisplayColumn>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TableConfigDialogData,
    private dialogRef: MatDialogRef<TableConfigDialogComponent>,
    private p: ActiveProjectService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.p.defaultLanguage$.subscribe(lang => this.defaultLanguage = lang);

    // listen to config changes
    this.tableConfig$ = this.p.pro$.table_config$.by_fk_digital$.key(this.data.pkDigital + '').pipe(
      filter(x => x !== undefined),
      map(ptc => values(ptc)),
      map(ptc => ptc[0] ? ptc[0].config : undefined)
    );
    // IMPORTANT: clone tableConfig before modifying, otherwise modifications will affect state object directly (state must be immutable) !
    this.tableConfig$.subscribe(ntc => this.tableConfig = clone(ntc));

    this.aggregated$ = combineLatest([
      this.filter$,
      this.tableConfig$,
      this.p.dat$.text_property$.by_pk_entity$.all$.pipe(map(textPropByPk => values(textPropByPk))),
      this.p.dat$.column$.by_pk_entity$.all$.pipe(map(columnByPk => values(columnByPk)))
    ]).pipe(
      map(([aFilter, config, textProperties, columns]) => {
        this.columns = config.columns
          .map((col, i) => {
            const updated = this.getUpdated(col.fkColumn);
            const txtProp = textProperties.find(tp => tp.fk_entity == col.fkColumn)
            return {
              pkColumn: col.fkColumn,
              visible: updated ? updated.visible : col.visible,
              name: updated ? updated.name : txtProp ? txtProp.string : undefined,
              type: updated ? updated.type : columns.find(c => c.pk_entity == col.fkColumn).fk_data_type == 3292 ? 'string' : 'number' as 'string' | 'number',
              position: updated ? updated.position : i
            }
          })
          .filter(column => (column.name ? column.name : '').toUpperCase().indexOf(aFilter.toUpperCase()) != -1)
          .concat(this.updates.filter(c => c.pkColumn < 0 && c.name.indexOf(aFilter) != -1))
          .sort((a, b) => a.position - b.position);
        return this.columns;
      }),
      takeUntil(this.destroy$),
    );
    this.aggregated$.subscribe(agg => this.aggregated = agg);
  }

  ngAfterViewChecked() {
    if (this.putAtBottom) {
      this.putAtBottom = !this.putAtBottom;
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  filter(value) {
    this.filterIsOn = !!value;
    this.filter$.next(value)
  }

  showHide(pkColumn: number, visible: boolean) {
    const updated = this.getUpdated(pkColumn);

    if (updated) this.setUpdated({ ...updated, visible });
    else this.setUpdated({ ...this.aggregated.find(c => c.pkColumn == pkColumn), visible });

    this.filter$.next(this.filter$.value);
  }

  move(oldIndex: number, newIndex: number) {
    this.editColumn = undefined;

    const tempTable = this.aggregated.sort((a, b) => a.position - b.position);
    const oldPosition = tempTable[oldIndex].position;
    const newPosition = tempTable[newIndex].position;

    const target = this.columns.find(c => oldPosition == c.position);
    if (oldIndex < newIndex) { // ie: move below
      this.columns
        .filter(c => oldPosition < c.position && c.position <= newPosition)
        .forEach(col => {
          col.position = col.position - 1
          this.setUpdated(col);
        });
    } else { // ie: move above
      this.columns
        .filter(c => oldPosition > c.position && c.position >= newPosition)
        .forEach(col => {
          col.position = col.position + 1;
          this.setUpdated(col);
        });
    }
    target.position = newPosition;
    this.setUpdated(target);

    this.filter(this.filter$.value);
  }

  changeColumnName(pkColumn: number, name: string, keepEdit?: boolean) {
    const updated = this.getUpdated(pkColumn);

    // save the update
    if (updated) this.setUpdated({ ...updated, name });
    else this.setUpdated({ ...this.aggregated.find(c => c.pkColumn == pkColumn), name });

    // update the front
    this.aggregated.find(c => c.pkColumn == pkColumn).name = name;
  }

  createNewColumn() {
    this.updates.push({ pkColumn: this.newColIndex, name: 'New column', position: this.aggregated.length, visible: true, type: 'string' });
    this.editColumn = this.newColIndex;

    this.filter$.next(this.filter$.value);
    this.newColIndex--;

    this.putAtBottom = true;
  }

  changeColumnType(pkColumn: number, type: 'string' | 'number') {
    this.editColumn = pkColumn;
    const updated = this.getUpdated(pkColumn);
    this.setUpdated({ ...updated, type });
  }

  getUpdated(pkColumn: number) {
    return this.updates.find(c => c.pkColumn == pkColumn);
  }

  setUpdated(column: DisplayColumn) {
    const idx = this.updates.findIndex(c => c.pkColumn == column.pkColumn);
    if (idx == -1) this.updates.push(column);
    else this.updates[idx] = column;
  }

  onClose(): void {
    const config: Array<TableConfigCol> = this.tableConfig.columns

    this.updates.forEach(update => {
      if (update.pkColumn >= 0) {
        // create the new config
        const oldPos = config.findIndex(col => col.fkColumn == update.pkColumn);
        const newPos = update.position
        if (newPos != oldPos) [config[oldPos], config[newPos]] = [config[newPos], config[oldPos]];
        config[newPos].visible = update.visible;
      }
    })

    this.dialogRef.close({ cols: { names: this.updates } })
  }

}
