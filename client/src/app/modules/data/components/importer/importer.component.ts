import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { WorkBook } from 'xlsx/types';
import { WorkerWrapperService } from '../../services/worker-wrapper.service';
import { first, takeUntil, switchMap } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../server/lb3app/src/server/table/interfaces'
import { InfLanguage, ActiveProjectService } from 'app/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { values } from 'ramda';
import { ImportTableControllerService, ImportTable } from 'app/core/sdk-lb4';
import { Header } from 'app/core/sdk-lb4';
import { ImportTableResponse } from 'app/core/sdk-lb4/model/importTableResponse';

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
  //UI
  mode: string;
  type: string;

  //about file
  files: NgxFileDropEntry[] = [];
  file: File;
  binaries: string; //need for the csv
  wb: WorkBook; //need for the xls

  //data
  curSort: { colNb: number, direction: string };
  filters: Array<{ col: number, filter: TColFilter }>;
  headers: Header[];
  table: string[][]; // the full table
  filteredTable: string[][]; //the full table filtered and sorted
  headers$: ReplaySubject<Header[]>; //the headers to display
  previewTable$: ReplaySubject<string[][]>; //the data to display

  //file options CSV
  separators = [';', ',', '|', 'TAB'];
  separator: string;
  commas = [',', '.'];
  comma: string;

  //file options XLS
  sheetsNames: string[];
  sheetName: string;

  //file options global
  columnsOptions = ['First row', 'No headers'];
  columnsOption: string;
  rowsNbs = ['20', '50', '100', '500', '1000'];
  rowsNb: string;

  //informations for server
  namespaces = [];
  namespace: any;
  languages = [];
  language: InfLanguage;

  //formControls
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

  ngOnInit() {
    this.reset();
  }

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
  }

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

  getRowsNb() {
    //get the nb of lines to take from table, if there is a header, we need to take one more row
    return this.columnsOption == 'First row' ? parseInt(this.rowsNb) + 1 : parseInt(this.rowsNb);
  }

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

    //CSV or XLS?
    const extension: string = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
    if (extension == 'csv') this.type = 'csv';
    else if (extension.indexOf('xls') != -1) this.type = 'xls';
    else {
      this.reset();
      data.paragraphs = ["Extention <" + extension + "> is not supported"];
      const dialog = this.dialog.open(ConfirmDialogComponent, { data });
      return;
    }

    //readFile
    const fr: FileReader = new FileReader();
    fr.readAsBinaryString(file);
    fr.onload = () => {
      if (typeof fr.result != "string") {
        this.reset();
        data.paragraphs = ["There has been an error while loading the file"];
        const dialog = this.dialog.open(ConfirmDialogComponent, { data });
        return;
      }
      if (fr.result.length == 0) {
        this.reset();
        data.paragraphs = ["The file is empty"];
        const dialog = this.dialog.open(ConfirmDialogComponent, { data });
        return;
      }

      this.binaries = fr.result;

      if (this.type == 'csv') { this.chooseDefaultSeparator(); this.parseCSV(); }
      else if (this.type == 'xls') this.parseWorkbook();
    };
  }

  chooseDefaultSeparator() {
    let counts = this.separators.map(s => {
      let toRegEx = s;
      if (s == 'TAB') toRegEx = String.fromCharCode(9);
      if (s == '|') toRegEx = '\\|';
      return {
        separator: s,
        count: (this.binaries.match(new RegExp(toRegEx, 'g')) || []).length
      }
    });
    let max = Math.max(...counts.map(c => c.count));
    this.separator = counts.filter(c => c.count == max)[0].separator;
  }

  parseCSV() {
    this.mode = 'parsing';
    this.worker.work('csvIntoTable', { separator: this.separator, binaries: this.binaries.trim() })
      .then(result => this.parseHeaders(result));
  }

  parseWorkbook() {
    this.worker.work('parseWorkbook', { binaries: this.binaries })
      .then(result => {
        this.wb = result;
        this.sheetsNames = this.wb.SheetNames;
        this.sheetName = this.sheetsNames[0];
        this.parseXLS();
      });
  }

  parseXLS() {
    this.mode = 'parsing';
    this.worker.work('workbookIntoTable', { wb: this.wb, sheetName: this.sheetName })
      .then(result => this.parseHeaders(result));
  }


  parseHeaders(result: string[][]) {
    if (!result) { // if we come from html: rebuild the result
      if (this.columnsOption != 'First row') // ==> if we had 'first row' and we are going to 'no headers'
        result = [this.headers.map(c => c.colLabel)].concat(this.table);
      else result = this.table;
    }

    this.headers = [];
    if (this.columnsOption == 'First row') {
      this.table = result.slice(1);
      //looking at the content of the data
      for (let i = 0; i < result[0].length; i++) {
        //We suppose that the table has the same number of col for each rows
        let type = this.type == 'csv' ? getTypeOfColumn(this.table, i, this.comma) : getTypeOfColumn(this.table, i);
        this.headers.push({ colLabel: result[0][i], comment: type, type: type });
      }
    } else {
      this.table = result;
      for (let i = 0; i < result[0].length; i++) {
        //We suppose that the table has the same number of col for each rows
        let type = this.type == 'csv' ? getTypeOfColumn(this.table, i, this.comma) : getTypeOfColumn(this.table, i);
        this.headers.push({ colLabel: 'Unknown column name', comment: type, type: type });
      }
    }

    this.headers$.next(this.headers);
    this.parseTable();
  }

  parseTable() {
    this.mode = 'preview';
    this.filter(this.filters); // this call will also launch the sorting
  }

  filter(filters: Array<{ col: number, filter: TColFilter }>) {
    if (this.mode == 'drag-and-drop') return;

    this.filters = filters; //only usefull when we come from html

    //if no filters are set
    if (this.filters.length == 0) {
      this.filteredTable = this.table; //do not take the header
      this.sort(this.curSort);
      return;
    }

    this.mode = 'parsing';
    this.worker.work('filterTable', {
      table: this.table, //do not take the header
      filters: this.filters
    }).then(result => {
      this.filteredTable = result;
      this.sort(this.curSort);
    })
  }

  sort(sortOpt: { colNb: number, direction: string }) {
    this.curSort = sortOpt; //only usefull when we come from html

    //if there is no sort
    if (this.curSort.colNb == -1) {
      this.previewTable$.next(this.filteredTable.slice(0, this.getRowsNb())); //put header back
      this.mode = 'preview';
      return;
    }

    this.mode = 'parsing';
    this.worker.work('sortTable', {
      table: this.filteredTable,
      colNb: sortOpt.colNb,
      type: this.headers[sortOpt.colNb].type,
      direction: sortOpt.direction
    }).then(result => {
      this.previewTable$.next(result.slice(0, this.getRowsNb())); //put header back
      this.mode = 'preview';
    });
  }

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
          this.mode = 'parsing';

          const importTable: ImportTable = {
            tableName: this.tableNameCtrl.value,
            pk_namespace: this.namespaceCtrl.value,
            pk_language: this.languageCtrl.value.pk_entity,
            headers: this.headers,
            rows: this.table,
          };



          this.apiImporter.importTableControllerImportTable(importTable)
          .pipe(
            switchMap(response => this.data.apiCall(response))
            )
            .subscribe(response => {
              if(!response) return;
              
              if (response.error) this.loaded("Import error", response.error + ' The table has not been imported');
              else this.loaded("Table uploaded", 'The table has correctly been imported');

              this.mode = 'preview';
            });
        }
      })
    } else this.tableForm.markAllAsTouched();
  }

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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


function getTypeOfColumn(table: Array<Array<string>>, colNb: number, comma?: string): 'number' | 'string' {
  //We suppose that the table has the same number of col for each rows
  let isNumber = true;
  for (let i = 0; i < table.length; i++) {
    let content = table[i][colNb];

    if (comma == ',') {
      content = content.replace('.', "}"); // replace dots to prevent parsing a number which is supposed to be a string
      content = content.replace(',', '.');
    }

    if (isNaN(+content)) {
      isNumber = false;
      break;
    }
  }
  return isNumber ? 'number' : 'string';
}