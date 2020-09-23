import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ReplaySubject, Subject, Observable, BehaviorSubject } from 'rxjs';
import { WorkBook } from 'xlsx/types';
import { WorkerWrapperService } from '../../services/worker-wrapper.service';
import { first, takeUntil, switchMap } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../server/src/lb3/server/table/interfaces'
import { InfLanguage, ActiveProjectService } from 'app/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { values } from 'ramda';
import { ImportTableControllerService, ImportTable } from 'app/core/sdk-lb4';
import { Header } from 'app/core/sdk-lb4';
import { ImportTableResponse } from 'app/core/sdk-lb4/model/importTableResponse';
import { ImportTableSocket } from 'app/core/sockets/sockets.module';

export interface ImporterDialogData {
  apiCall: (table: ImportTableResponse) => Observable<ImportTableResponse>
}

@Component({
  selector: 'gv-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
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
  filters: Array<{ col: number, filter: TColFilter }>;
  headers: Header[];
  table: string[][]; // the full table
  filteredTable: string[][]; // the full table filtered and sorted
  headers$: ReplaySubject<Header[]>; // the headers to display
  previewTable$: ReplaySubject<string[][]>; // the data to display

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

  // informations for server
  namespaces = [];
  namespace: any;
  languages = [];
  language: InfLanguage;

  // formControls
  tableNameCtrl = new FormControl('', [Validators.required]);
  namespaceCtrl = new FormControl('', [Validators.required]);
  languageCtrl = new FormControl('', [Validators.required]);


  tableForm = new FormGroup({
    tableNameCtrl: this.tableNameCtrl,
    namespaceCtrl: this.namespaceCtrl,
    languageCtrl: this.languageCtrl,
  });

  sortBy$: ReplaySubject<number>;

  constructor(
    private importTableSocket: ImportTableSocket,
    private worker: WorkerWrapperService,
    private dialog: MatDialog,
    private p: ActiveProjectService,
    private apiImporter: ImportTableControllerService,
    @Inject(MAT_DIALOG_DATA) public data: ImporterDialogData
  ) {
    this.p.defaultLanguage$.pipe(takeUntil(this.destroy$)).subscribe(defaultLang => this.languageCtrl.setValue(defaultLang))
    this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.dat$.namespace$.by_fk_project$.key(pkProject).pipe(takeUntil(this.destroy$)).subscribe(namespacesIdx => {
        this.namespaces = values(namespacesIdx).sort((a, b) => a.pk_entity - b.pk_entity);
        this.namespaceCtrl.setValue(this.namespaces[0].pk_entity);
      })
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
    this.headers$ = new ReplaySubject();
    this.previewTable$ = new ReplaySubject();

    this.separator = this.separators[0];
    this.comma = this.commas[0];
    this.sheetsNames = [];
    this.sheetName = '';
    this.columnsOption = this.columnsOptions[0];
    this.rowsNb = this.rowsNbs[0];
    this.fkDigital = -1;
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
    fr.readAsBinaryString(file);
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
   * Making the Step to first parse into workbook allow us to avoid to reparse everything if is was not the first Excel Sheet that the user wanted to import
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
  parseHeaders(result: string[][]) {
    if (!result) { // if we come from html: rebuild the result
      if (this.columnsOption != 'First row') { // ==> if we had 'first row' and we are going to 'no headers'
        result = [this.headers.map(c => c.colLabel)].concat(this.table);
      } else result = this.table;
    }

    this.headers = [];
    if (this.columnsOption == 'First row') {
      this.table = result.slice(1);
      // looking at the content of the data
      for (let i = 0; i < result[0].length; i++) {
        // We suppose that the table has the same number of col for each rows
        const type = this.type == 'csv' ? getTypeOfColumn(this.table, i, this.comma) : getTypeOfColumn(this.table, i);
        this.headers.push({ colLabel: result[0][i], comment: type, type: type });
      }
    } else {
      this.table = result;
      for (let i = 0; i < result[0].length; i++) {
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
  filter(filters: Array<{ col: number, filter: TColFilter }>) {
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
      this.previewTable$.next(this.filteredTable.slice(0, this.getRowsNb())); // put header back
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

          this.apiImporter.importTableControllerImportTable(this.namespaceCtrl.value, importTable)
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
              if (response.error) this.loaded('Import error', 'The table has not been imported: ' + response.error);
              // else this.loaded('Table uploaded', 'Your table is saved in our database, we are right now creating it. It may take a few moments, based on your table. To know when it will be finished, keep the importer open.');
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
  loaded(title: string, message: string) {
    const data: ConfirmDialogData = {
      noBtnText: '',
      yesBtnText: 'Ok',
      yesBtnColor: 'primary',
      title: title,
      paragraphs: [message],
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data });
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
