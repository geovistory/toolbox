import { CdkDrag, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StateFacade } from '@kleiolab/lib-redux';
import { ColumnNames, InfLanguage, TableConfig, TableConfigCol } from '@kleiolab/lib-sdk-lb4';
import { clone, values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../shared/services/active-project.service';

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
  styleUrls: ['./table-config-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, NgStyle, MatInputModule, NgIf, CdkDropList, NgFor, CdkDrag, CdkDragPlaceholder, MatCheckboxModule, FormsModule, MatRadioModule, MatIconModule, MatTooltipModule, MatButtonModule]
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
    private state: StateFacade,
    private p: ActiveProjectService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.state.data.getProjectLanguage(this.state.pkProject).pipe(takeUntil(this.destroy$)).subscribe(lang => this.defaultLanguage = lang);

    // listen to config changes
    this.tableConfig$ = this.state.data.pro.tableConfig.getTableConfig.byFkDigital$(this.data.pkDigital).pipe(
      filter(x => x !== undefined),
      map(ptc => values(ptc)),
      map(ptc => ptc[0] ? ptc[0].config : undefined)
    );
    // IMPORTANT: clone tableConfig before modifying, otherwise modifications will affect state object directly (state must be immutable) !
    this.tableConfig$.subscribe(ntc => this.tableConfig = clone(ntc));

    this.aggregated$ = combineLatest([
      this.filter$,
      this.tableConfig$,
      this.state.data.dat.textProperty.pkEntityIndex$.pipe(map(textPropByPk => values(textPropByPk))),
      this.state.data.dat.column.pkEntityIndex$.pipe(map(columnByPk => values(columnByPk)))
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
