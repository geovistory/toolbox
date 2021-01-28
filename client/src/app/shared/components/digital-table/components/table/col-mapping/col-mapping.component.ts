import { Statement } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatRadioChange, MAT_DIALOG_DATA } from '@angular/material';
import { ActiveProjectService } from 'app/core/active-project';
import { InfActions } from 'app/core/inf/inf.actions';
import { ProActions } from 'app/core/pro/pro.actions';
import { TableService } from 'app/core/sdk-lb4';
import { UnMapCheckResponse } from 'app/core/sdk-lb4/model/unMapCheckResponse';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { SystemSelector } from 'app/core/sys/sys.service';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { ColumnMapping } from '../table.component';

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
    specialClasses: Array<{ label: string, pkClass: number }>,
    normalClasses: Array<{ label: string, pkClass: number }>
  }>

  allClasses: Array<{ label: string, pkClass: number }>;
  selectedClass: number;
  selectedClassLabel: string;

  filter$ = new BehaviorSubject<string>('');
  filteredClasses$: Observable<{
    specialClasses: Array<{ label: string, pkClass: number }>,
    normalClasses: Array<{ label: string, pkClass: number }>
  }>

  pkStatements: Array<number> = []

  // form controls
  selectedClassCtrl = new FormControl('', [Validators.required]);
  form = new FormGroup({ selectedClassCtrl: this.selectedClassCtrl });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { colLabel: string, pkColumn: number, mapping: ColumnMapping, pkCells: Array<number> },
    private p: ActiveProjectService,
    private sys: SystemSelector,
    private s: SchemaObjectService,
    private tableAPI: TableService,
    public c: ConfigurationPipesService,
    private dialog: MatDialog,
    private proActions: ProActions
  ) { }

  ngOnInit() {
    this.selectedClass = this.data.mapping ? this.data.mapping.fkClass : -1;

    // fetch pkProject
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.pkProject = pkProject;
    })

    // fetch pkNamespace
    this.p.datNamespaces$.pipe(first(), takeUntil(this.destroy$)).subscribe(namespaces => {
      this.pkNamespace = namespaces.length ? namespaces[0].pk_entity : 0;
    });

    // get the classes
    this.classes$ = combineLatest([this.c.pipeClassesEnabledByProjectProfiles().pipe(
      switchMap(klasses => combineLatestOrEmpty(klasses
        .map(klass => this.c.pipeClassLabel(klass.pk_class).pipe(
          map(label => ({
            label,
            pkClass: klass.pk_class
          }))
        ))))
    ), this.sys.config$.main$]).pipe(
      map(([classes, config]) => {
        const specialClasses: Array<{ label: string, pkClass: number }> = [];
        const normalClasses: Array<{ label: string, pkClass: number }> = [];
        classes.forEach(c => {
          if (config.classes[c.pkClass] && config.classes[c.pkClass].mapsToListType) specialClasses.push(c);
          else normalClasses.push(c);
        })
        this.allClasses = specialClasses.concat(normalClasses);
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

    // save the statements concerned by the mapping in order to be able to delete them if needed
    this.data.pkCells.forEach(pkCell => {
      this.p.inf$.statement$.by_subject_and_property$({
        fk_property_of_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
        fk_subject_tables_cell: pkCell
      }).pipe(takeUntil(this.destroy$)).subscribe(statements => {
        this.pkStatements = statements.map(s => s.pk_entity);
      })
    })

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
      const isOk: Observable<UnMapCheckResponse> = this.tableAPI.tableControllerUnMapColumnCheck(this.pkNamespace, { pkColumn: this.data.mapping.pkColumn });
      isOk.subscribe(resp => {
        if (resp.ok) {
          // we can update the column mapping right away
          if (this.selectedClass === -1 || this.data.mapping) this.deleteColumnMapping();
          if (!this.data.mapping || this.selectedClass !== -1) this.createColumnMapping();
        } else {
          // carefull, there is matching to some cell(s) of the column: ask 2 confirmations before delete all
          const multiple = resp.matchingNb !== 1;
          const message1 = 'You can not delete this mapping: there ' + (multiple ? 'are' : 'is') + ' ' + resp.matchingNb + ' matching' + (multiple ? 's' : '') + ' in this column.'
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
                if (confirmed2) this.deleteColumnMapping();
                else this.selectedClass = this.data.mapping.fkClass;
              })
            } else this.selectedClass = this.data.mapping.fkClass;

          });
        }
      })
    }
  }

  deleteColumnMapping() {
    const result = this.tableAPI.tableControllerUnMapColumn(this.pkNamespace, { pkColumn: this.data.mapping.pkColumn, deleteAll: true }).pipe(shareReplay());
    this.s.modifyGvSchema(result, this.pkProject);
  }

  createColumnMapping() {
    const result = this.tableAPI.tableControllerMapColumn(this.pkNamespace, { pkClass: this.selectedClass, pkColumn: this.data.pkColumn });
    this.s.storeGv(result, this.pkProject);
  }
}
