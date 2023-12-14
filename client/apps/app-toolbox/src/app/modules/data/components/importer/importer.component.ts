import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { StateFacade } from '@kleiolab/lib-redux';
import { ImportTable, ImportTableControllerService, ImportTableResponse, InfLanguage, TColFilter } from '@kleiolab/lib-sdk-lb4';
import { ImportTableSocket } from '@kleiolab/lib-sockets';
import { FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { values } from 'ramda';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { WorkBook } from 'xlsx/types';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Cell, Header, TableComponent } from '../../../../shared/components/digital-table/components/table/table.component';
import { ActiveAccountService } from '../../../../shared/services/active-account.service';
import { CtrlLanguageComponent } from '../../../base/components/ctrl-language/ctrl-language.component';
import { WorkerWrapperService } from '../../services/worker-wrapper.service';

export interface ImporterDialogData {
  apiCall: (table: ImportTableResponse) => Observable<ImportTableResponse>
}

export interface ImporterColFilter {
  colNb: number,
  filter: TColFilter
}

@Component({
  selector: 'gv-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss'],
  standalone: true,
  imports: [MatDialogModule, NgIf, NgxFileDropModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, NgFor, MatOptionModule, MatProgressBarModule, TableComponent, FormsModule, ReactiveFormsModule, CtrlLanguageComponent, AsyncPipe]
})
export class ImporterComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  // UI
  mode: string;
  type: string;
  socketMessage$ = new BehaviorSubject<string>('');

  // about file
  files: NgxFileDropEntry[] = [];
  file: File;
  binaries: string; // need for the csv
  wb: WorkBook; // need for the xls
  fkDigital: number; // the digital key. Only assigned when the upload has started

  // data
  curSort: { colNb: number, direction: string };
  filters: Array<ImporterColFilter>;
  headers: Header[];
  table: string[][]; // the full table
  filteredTable: string[][]; // the full table filtered and sorted
  headers$ = new ReplaySubject<Header[]>(); // the headers to display
  previewTable$ = new ReplaySubject<Cell[][]>(); // the data to display

  // file options CSV
  separators = [';', ',', '|', 'TAB'];
  separator: string;
  commas = [',', '.'];
  comma: string;

  // file options XLS
  sheetsNames: string[];
  sheetName: string;

  // file options global
  columnsOptions = ['First row', 'No headers'];
  columnsOption: string;
  rowsNbs = ['20', '50', '100', '500', '1000'];
  rowsNb: string;
  encodings = ['UTF-8', 'UTF-16', 'ASCII', 'CYRILLIC', 'ARABIC', 'GREEK', 'HEBREW', 'CHINESE', 'KOREAN', 'BINARY', 'BASE64'];
  encoding: string;

  // informations for server
  namespaces = [];
  namespace: any;
  languages = [];
  language: InfLanguage;
  pkProject: number;

  // formControls
  tableNameCtrl = new UntypedFormControl('', [Validators.required]);
  namespaceCtrl = new UntypedFormControl('', [Validators.required]);
  languageCtrl = new UntypedFormControl('', [Validators.required]);

  tableForm = new UntypedFormGroup({
    tableNameCtrl: this.tableNameCtrl,
    namespaceCtrl: this.namespaceCtrl,
    languageCtrl: this.languageCtrl,
  });

  sortBy$: ReplaySubject<number>;

  constructor(
    private importTableSocket: ImportTableSocket,
    private worker: WorkerWrapperService,
    private dialog: MatDialog,
    private a: ActiveAccountService,
    private state: StateFacade,
    private apiImporter: ImportTableControllerService,
    private dialogRef: MatDialogRef<ImporterComponent, ImporterDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: ImporterDialogData
  ) {
    this.pkProject = this.state.pkProject;
    this.state.data.inf.language.getLanguage.byPkEntity$

    this.state.data.getProjectLanguage(this.pkProject)
      .pipe(takeUntil(this.destroy$))
      .subscribe(defaultLang => this.languageCtrl.setValue(defaultLang))

    this.state.data.dat.namespace.getNamespace.byFkProject$(this.pkProject).pipe(takeUntil(this.destroy$)).subscribe(namespacesIdx => {
      this.namespaces = values(namespacesIdx).sort((a, b) => a.pk_entity - b.pk_entity);
      this.namespaceCtrl.setValue(this.namespaces[0].pk_entity);
    })
  }

  /**
   * On init: reset the screen
   */
  ngOnInit() {
    this.reset();
    this.importTableSocket.cleanConnect();
  }

  /**
   * Clean all Importer variable, and reput the drag and drop zone
   */
  reset() {
    this.mode = 'drag-and-drop';
    this.type = '';
    this.file = undefined;
    this.binaries = '';
    this.curSort = { colNb: -1, direction: '' };
    this.filters = [];
    this.table = [];
    this.filteredTable = [];
    this.headers$.next([])
    this.previewTable$.next([])
    this.separator = this.separators[0];
    this.comma = this.commas[0];
    this.sheetsNames = [];
    this.sheetName = '';
    this.columnsOption = this.columnsOptions[0];
    this.rowsNb = this.rowsNbs[0];
    this.fkDigital = -1;
    this.encoding = this.encodings[0];
  }

  /**
   * Function called when users select a file
   * @param files Files from the <input> tag in the html
   */
  onFileDrop(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectFile(file);
        });
      }
    }
  }

  /**
   * Get the right number of line to take from the table: When there is a header, the first line has to not being taken
   * @returns the right nb of actual rows of the table
   */
  getRowsNb() {
    // get the nb of lines to take from table, if there is a header, we need to take one more row
    return this.columnsOption == 'First row' ? parseInt(this.rowsNb, 10) + 1 : parseInt(this.rowsNb, 10);
  }

  /**
   * Launch the parsing procedure
   * @param file The file to parse and display
   */
  selectFile(file: File) {
    if (!file) return;
    this.file = file;
    this.tableNameCtrl.setValue(file.name.substring(0, file.name.lastIndexOf('.')));

    this.mode = 'load';

    const data: ConfirmDialogData = {
      noBtnText: '',
      yesBtnText: 'Ok',
      yesBtnColor: 'primary',
      title: 'Can not parse the file',
      paragraphs: []
    }

    // CSV or XLS?
    const extension: string = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (extension == 'csv') this.type = 'csv';
    else if (extension.indexOf('xls') != -1) this.type = 'xls';
    else {
      this.reset();
      data.paragraphs = ['Extention <' + extension + '> is not supported'];
      const dialog = this.dialog.open(ConfirmDialogComponent, { data });
      return;
    }

    // readFile
    const fr: FileReader = new FileReader();
    if (this.type === 'xls' || this.encoding === 'BINARY') fr.readAsBinaryString(file);
    else if (this.encoding === 'BASE64') fr.readAsDataURL(file);
    else fr.readAsText(file, this.encoding.toLowerCase());

    fr.onload = () => {
      if (typeof fr.result != 'string') {
        this.reset();
        data.paragraphs = ['There has been an error while loading the file'];
        const dialog = this.dialog.open(ConfirmDialogComponent, { data });
        return;
      }
      if (fr.result.length == 0) {
        this.reset();
        data.paragraphs = ['The file is empty'];
        const dialog = this.dialog.open(ConfirmDialogComponent, { data });
        return;
      }

      this.binaries = fr.result;

      if (this.type == 'csv') { this.chooseDefaultSeparator(); this.parseCSV(); }
      else if (this.type == 'xls') this.parseWorkbook();
    };
  }

  /**
   * Feature that will count the occurences of different separator and set as a attribute the one that is more present in the file
   */
  chooseDefaultSeparator() {
    const counts = this.separators.map(s => {
      let toRegEx = s;
      if (s == 'TAB') toRegEx = String.fromCharCode(9);
      if (s == '|') toRegEx = '\\|';
      return {
        separator: s,
        count: (this.binaries.match(new RegExp(toRegEx, 'g')) || []).length
      }
    });
    const max = Math.max(...counts.map(c => c.count));
    this.separator = counts.filter(c => c.count == max)[0].separator;
  }

  /**
   * Parse the binaries of the file into the string[][] format. Uses the WWW
   */
  parseCSV() {
    this.mode = 'parsing';
    this.worker.work('csvIntoTable', { separator: this.separator, binaries: this.binaries.trim() })
      .then(result => this.parseHeaders(result));
  }

  /**
   * Parse the binaries of the file into the workbook format. Uses the WWW.
   * Making the Step to first parse into workbook allow us to avoid
   * to reparse everything if is was not the first Excel Sheet that the user wanted to import
   */
  parseWorkbook() {
    this.worker.work('parseWorkbook', { binaries: this.binaries })
      .then(result => {
        this.wb = result;
        this.sheetsNames = this.wb.SheetNames;
        this.sheetName = this.sheetsNames[0];
        this.parseXLS();
      });
  }

  /**
   * Parse the Workbook into the string[][] format
   */
  parseXLS() {
    this.mode = 'parsing';
    this.worker.work('workbookIntoTable', { wb: this.wb, sheetName: this.sheetName })
      .then(result => this.parseHeaders(result));
  }

  /**
   *  Deduction of the headers from the parsed binaries (either CSV or XLSX)
   * @param result the binaries parsed
   */
  parseHeaders(result?: string[][]) {
    if (!result) { // if we come from html: rebuild the result
      if (this.columnsOption != 'First row') { // ==> if we had 'first row' and we are going to 'no headers'
        result = [this.headers.map(c => c.colLabel)].concat(this.table);
      } else result = this.table;
    }

    const maxColumn = Math.max(...result.map(r => r.length));

    this.headers = [];
    if (this.columnsOption == 'First row') {
      this.table = result.slice(1);
      // looking at the content of the data
      for (let i = 0; i < maxColumn; i++) {
        // We suppose that the table has the same number of col for each rows
        const type = this.type == 'csv' ? getTypeOfColumn(this.table, i, this.comma) : getTypeOfColumn(this.table, i);
        this.headers.push({ colLabel: result[0][i] ? result[0][i] : 'Unknown column name', comment: type, type: type });
      }
    } else {
      this.table = result;
      for (let i = 0; i < maxColumn; i++) {
        // We suppose that the table has the same number of col for each rows
        const type = this.type == 'csv' ? getTypeOfColumn(this.table, i, this.comma) : getTypeOfColumn(this.table, i);
        this.headers.push({ colLabel: 'Unknown column name', comment: type, type: type });
      }
    }

    this.headers$.next(this.headers);
    this.parseTable();
  }

  /**
   * Starting point of data cleaning. Called when global params are changed and/or when filtering and sorting need to be updated
   */
  parseTable() {
    this.mode = 'preview';
    this.filter(this.filters); // this call will also launch the sorting
  }

  /**
   * Filters the table according to all previously filters set
   * @param filters All filters in place
   */
  filter(filters: Array<ImporterColFilter>) {
    if (this.mode == 'drag-and-drop') return;

    this.filters = filters; // only usefull when we come from html

    // if no filters are set
    if (this.filters.length == 0) {
      this.filteredTable = this.table; // do not take the header
      this.sort(this.curSort);
      return;
    }

    this.mode = 'parsing';
    this.worker.work('filterTable', {
      table: this.table, // do not take the header
      filters: this.filters
    }).then(result => {
      this.filteredTable = result;
      this.sort(this.curSort);
    })
  }

  /**
   * Slort the table according to all previously sorting options set
   * @param sortOpt All sorting options in place
   */
  sort(sortOpt: { colNb: number, direction: string }) {
    this.curSort = sortOpt; // only usefull when we come from html

    // if there is no sort
    if (this.curSort.colNb == -1) {
      const stringTable = this.filteredTable.slice(0, this.getRowsNb());
      this.previewTable$.next(stringTable.map(row => row.map(cell => ({ text: cell })))); // put header back
      this.mode = 'preview';
      return;
    }

    this.mode = 'parsing';
    this.worker.work('sortTable', {
      table: this.filteredTable,
      colNb: sortOpt.colNb,
      direction: sortOpt.direction
    }).then(result => {
      this.previewTable$.next(result.slice(0, this.getRowsNb())); // put header back
      this.mode = 'preview';
    });
  }

  /**
   * Event happening when the user click on 'Load' button.
   * Ask confirmation first
   */
  load() {
    if (this.tableForm.valid) {
      const data: ConfirmDialogData = {
        noBtnText: 'Cancel',
        yesBtnText: 'Upload',
        yesBtnColor: 'warn',
        title: 'Upload your table',
        paragraphs: ['Do you want to upload your table as it is \ndisplayed?'],
      }
      const dialog = this.dialog.open(ConfirmDialogComponent, { data });
      dialog.afterClosed().pipe(first()).subscribe(confirmed => {
        if (confirmed) {
          this.mode = 'uploading';
          this.socketMessage$.next('Uploading...');

          const importTable: ImportTable = {
            fileName: this.file.name,
            tableName: this.tableNameCtrl.value,
            pk_language: this.languageCtrl.value.pk_entity,
            headers: this.headers,
            rows: this.table,
          };

          this.apiImporter.importTableControllerImportTable(this.pkProject, this.namespaceCtrl.value, this.a.account.id, importTable)
            .pipe(switchMap(response => {

              this.fkDigital = response.fk_digital;
              this.importTableSocket.emit('listenDigitals', [this.fkDigital]);

              this.importTableSocket.on('state_' + this.fkDigital, (state: { id: number, advancement: number, infos: string }) => {
                if (this.fkDigital == state.id && state.infos != '') {
                  if (state.infos != 'inexisting') this.socketMessage$.next(state.infos);
                  if (state.advancement == 100) {
                    this.mode = 'drag-and-drop';
                    this.loaded('Table Uploaded', 'Your table has correctly been imported');
                    this.reset();
                  }
                }
              })

              this.importTableSocket.fromEvent('reconnect')
                .pipe(takeUntil(this.destroy$))
                .subscribe(disconnect => {
                  this.importTableSocket.emit('listenDigitals', [this.fkDigital]);
                })

              return this.data.apiCall(response);
            }))
            .subscribe(response => {
              if (!response) return;
              if (response.error) {
                this.mode = 'preview';
                this.loaded('Import error', 'The table has not been imported: ' + response.error)
              };
              // else this.loaded('Table uploaded', 'Your table is saved in our database, we are right now creating it.
              // It may take a few moments, based on your table. To know when it will be finished, keep the importer open.');
            });
        }
      })
    } else this.tableForm.markAllAsTouched();
  }

  /**
   * Function triggered when the client get a response from the /import-table call
   * @param title Title of the message from the server
   * @param message Message from the server
   */
  async loaded(title: string, message: string) {
    const data: ConfirmDialogData = {
      noBtnText: '',
      yesBtnText: 'Ok',
      yesBtnColor: 'primary',
      title: title,
      paragraphs: [message],
    }
    await this.dialog.open(ConfirmDialogComponent, { data }).afterClosed().pipe(first()).toPromise();
    this.dialogRef.close()
  }

  /**
   * Clean destroy of component
   */
  ngOnDestroy() {
    // this.importTableSocket.cleanDisconnect();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

/**
 * Read the column to see if it is a number of a string
 * @param table The table in which the column is
 * @param colNb The target column
 * @param comma What comma is used in number (<,> or <.> or ...);
 */
function getTypeOfColumn(table: Array<Array<string>>, colNb: number, comma?: string): 'number' | 'string' {
  // We suppose that the table has the same number of col for each rows
  let isNumber = true;
  for (let i = 0; i < table.length; i++) {
    let content = table[i][colNb];
    if (content === undefined) continue;

    if (comma == ',') {
      content = content.replace('.', '}'); // replace dots to prevent parsing a number which is supposed to be a string
      content = content.replace(',', '.');
    }

    if (isNaN(+content)) {
      isNumber = false;
      break;
    }
  }
  return isNumber ? 'number' : 'string';
}
