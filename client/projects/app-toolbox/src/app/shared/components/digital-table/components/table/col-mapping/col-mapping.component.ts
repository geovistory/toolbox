import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ConfigurationPipesService, SysSelector } from '@kleiolab/lib-queries';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { TableService, UnMapCheckResponse } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../confirm-dialog/confirm-dialog.component';
import { ColumnMapping } from '../table.component';

interface ClassOption {
  label: string;
  pkClass: number;
};

@Component({
  selector: 'gv-col-mapping',
  templateUrl: './col-mapping.component.html',
  styleUrls: ['./col-mapping.component.scss']
})
export class ColMappingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  pkProject: number;
  pkNamespace: number;

  classes$: Observable<{
    specialClasses: Array<ClassOption>,
    normalClasses: Array<ClassOption>
  }>

  allClasses: Array<ClassOption>;
  selectedClass: number;
  selectedClassLabel: string;

  filter$ = new BehaviorSubject<string>('');
  filteredClasses$: Observable<{
    specialClasses: Array<ClassOption>,
    normalClasses: Array<ClassOption>
  }>

  pkStatements: Array<number> = []

  // form controls
  selectedClassCtrl = new UntypedFormControl('', [Validators.required]);
  form = new UntypedFormGroup({ selectedClassCtrl: this.selectedClassCtrl });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { colLabel: string, pkColumn: number, mapping: ColumnMapping, pkCells: Array<number> },
    private p: ActiveProjectService,
    private sys: SysSelector,
    private state: StateFacade,
    private tableAPI: TableService,
    public c: ConfigurationPipesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.selectedClass = this.data.mapping ? this.data.mapping.fkClass : -1;

    // fetch pkProject
    this.pkProject = this.state.pkProject

    // fetch pkNamespace
    this.state.data.dat.namespace.getNamespace.byFkProject$(this.pkProject)
      .pipe(first(), map(n => values(n)), takeUntil(this.destroy$)).subscribe(namespaces => {
        this.pkNamespace = namespaces.length ? namespaces[0].pk_entity : 0;
      });

    // get the classes
    this.classes$ = combineLatest([this.c.pipeClassesOfProject().pipe(
      switchMap(items => combineLatestOrEmpty(items
        .map(item => this.c.pipeClassLabel(item.dfhClass.pk_class).pipe(
          map(label => ({
            label,
            item
          }))
        ))))
    ), this.sys.config$.main$]).pipe(
      map(([items, config]) => {
        const specialClasses: Array<ClassOption> = [];
        const normalClasses: Array<ClassOption> = [];
        items.forEach(i => {
          const o: ClassOption = { pkClass: i.item.dfhClass.pk_class, label: i.label }
          if (i.item.classConfig?.valueObjectType) specialClasses.push(o);
          else if (!values(i.item.belongsToCategory)?.[0]?.showInAddMenu === false) normalClasses.push(o);
        })
        normalClasses.sort((a, b) => a.label < b.label ? -1 : 1);
        specialClasses.sort((a, b) => a.label < b.label ? -1 : 1);
        this.allClasses = specialClasses.concat(normalClasses).sort((a, b) => a.label < b.label ? -1 : 1);
        return { specialClasses, normalClasses }
      })
    )

    this.filteredClasses$ = combineLatest([this.classes$, this.filter$]).pipe(
      map(([classes, filter]) => ({
        specialClasses: classes.specialClasses.filter(c => c.label.toLowerCase().indexOf(filter.toLowerCase()) != -1),
        normalClasses: classes.normalClasses.filter(c => c.label.toLowerCase().indexOf(filter.toLowerCase()) != -1)
      })),
      takeUntil(this.destroy$),
    )

    // todo: delete this part, if not needed:
    // // save the statements concerned by the mapping in order to be able to delete them if needed
    // this.data.pkCells.forEach(pkCell => {
    //   this.p.inf$.statement$.by_subject_and_property$({
    //     fk_property_of_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
    //     fk_subject_tables_cell: pkCell
    //   }).pipe(takeUntil(this.destroy$)).subscribe(statements => {
    //     this.pkStatements = statements.map(s => s.pk_entity);
    //   })
    // })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filter(value) {
    this.filter$.next(value)
  }

  mapColumn(event: MatRadioChange) {
    this.selectedClass = parseInt(event.value as string, 10);
    this.selectedClassLabel = this.selectedClass == -1 ? 'Nothing' : this.allClasses.filter(c => c.pkClass === this.selectedClass)[0].label;
  }


  changeColumnMapping() {
    if (!this.data.mapping || !this.data.mapping.pkColumn) this.createColumnMapping();
    else {
      const isOk: Observable<UnMapCheckResponse> = this.tableAPI
        .tableControllerUnMapColumnCheck(this.pkNamespace, { pkColumn: this.data.mapping.pkColumn });
      isOk.subscribe(resp => {
        if (resp.ok) {
          // we can update the column mapping right away
          if (this.selectedClass === -1 || this.data.mapping) this.deleteColumnMapping();
          if (!this.data.mapping || this.selectedClass !== -1) this.createColumnMapping();
        } else {
          // carefull, there is matching to some cell(s) of the column: ask 2 confirmations before delete all
          const multiple = resp.matchingNb !== 1;
          const message1 = 'You can not delete this mapping: there ' + (multiple ? 'are' : 'is')
            + ' ' + resp.matchingNb + ' matching' + (multiple ? 's' : '') + ' in this column.'
          const message2 = 'You have to delete ' + (multiple ? 'them' : 'it') + ' if you want to remove the mapping.';
          const data: ConfirmDialogData = {
            noBtnText: 'Cancel',
            yesBtnText: 'Delete all matchings',
            yesBtnColor: 'warn',
            title: 'Can not directly update the mapping:',
            paragraphs: [message1, message2],
          }
          const dialog = this.dialog.open(ConfirmDialogComponent, { data });
          dialog.afterClosed().pipe(first()).subscribe(confirmed => {
            if (confirmed) {
              const data2: ConfirmDialogData = {
                noBtnText: 'Cancel',
                yesBtnText: 'Confirm',
                yesBtnColor: 'warn',
                title: 'Confirm',
                paragraphs: ['You are about to delete all the matchings for the column.'],
              }
              const dialog2 = this.dialog.open(ConfirmDialogComponent, { data: data2 });
              dialog2.afterClosed().pipe(first()).subscribe(confirmed2 => {
                if (confirmed2) {
                  this.deleteColumnMapping();
                  this.createColumnMapping();
                }
                else this.selectedClass = this.data.mapping.fkClass;
              })
            } else this.selectedClass = this.data.mapping.fkClass;

          });
        }
      })
    }
  }

  deleteColumnMapping() {
    this.state.data.unmapTableColumn(this.pkNamespace, { pkColumn: this.data.mapping.pkColumn, deleteAll: true })
  }

  createColumnMapping() {
    this.state.data.mapTableColumn(this.pkNamespace, { pkClass: this.selectedClass, pkColumn: this.data.pkColumn })
  }
}
