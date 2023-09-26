import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { InfActions, ReduxMainService, textPropertyByFksWithoutLang } from '@kleiolab/lib-redux';
import { InfLanguage, ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { either, is, isEmpty, isNil, map as rmap, pipe, reject, when } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, mergeMap, takeUntil } from 'rxjs/operators';
interface Row {

  textProperty: ProTextProperty
  language: InfLanguage
  editMode: boolean;
  saving: boolean
  label: string,
  languageLabel: string
  // type: string
}
@Component({
  selector: 'gv-property-label-table',
  templateUrl: './property-label-table.component.html',
  styleUrls: ['./property-label-table.component.scss']
})
export class PropertyLabelTableComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() fkProject: number
  @Input() fkSystemType: number
  @Input() fkProperty: number
  @Input() fkPropertyDomain: number
  @Input() fkPropertyRange: number
  @Input() fkClass: number

  editing$ = new BehaviorSubject<ProTextProperty>(null) // pk_entity of ProTextProperty being edited
  saving$ = new BehaviorSubject<number>(null)
  rows$: Observable<Row[]>
  creating$ = new BehaviorSubject<boolean>(false)
  dataSource = new MatTableDataSource<Row>()
  displayedColumns = ['label', 'language', 'actions'];

  labelCtrl = new UntypedFormControl('', [Validators.required])
  languageCtrl = new UntypedFormControl(null, [Validators.required])
  // typeCtrl = new FormControl('singular', [Validators.required])
  form: UntypedFormGroup = this.fb.group({
    labelCtrl: this.labelCtrl,
    langugageCtrl: this.languageCtrl,
    // typeCtrl: this.typeCtrl
  })

  constructor(
    private p: ActiveProjectService,
    private dataService: ReduxMainService,
    private fb: UntypedFormBuilder,
    private inf: InfActions
  ) { }

  ngOnInit() {

    if (!this.fkSystemType) throw new Error('you must provide fkSystemType input')
    if (!this.fkProject) throw new Error('you must provide fkProject input')
    if (
      !(
        (this.fkProperty && this.fkPropertyDomain) ||
        (this.fkProperty && this.fkPropertyRange) ||
        (this.fkClass)
      )
    ) {
      throw new Error('you must provide fkProperty with fkPropertyDomain or fkPropertyRange input')
    }
    const key = textPropertyByFksWithoutLang({
      fk_project: this.fkProject,
      fk_system_type: this.fkSystemType,
      fk_dfh_class: this.fkClass,
      fk_dfh_property: this.fkProperty,
      fk_dfh_property_domain: this.fkPropertyDomain,
      fk_dfh_property_range: this.fkPropertyRange,
    })
    this.rows$ = combineLatest(
      this.p.pro$.text_property$
        .by_fks_without_lang$
        .key(key)
        .pipe(map((props) => values(props))),
      this.editing$,
      this.saving$,
      this.creating$
    ).pipe(
      mergeMap(([textProperties, editing, saving, creating]) => combineLatestOrEmpty(
        textProperties
          .map(textProp => this.p.inf$.language$.by_pk_entity$.key(textProp.fk_language)
            .pipe(
              filter(lang => !!lang),
              map(language => {

                const row: Row = {
                  editMode: editing && textProp.pk_entity === editing.pk_entity,
                  saving: saving == textProp.pk_entity,
                  textProperty: textProp,
                  language,
                  label: textProp.string,
                  languageLabel: language.notes,
                }

                return row

              })
            )
          )
      ).pipe(
        map(rows => creating ?
          [{
            editMode: true,
          } as Row, ...rows] :
          rows
        )
      )
      )
    )

    this.rows$.pipe(takeUntil(this.destroy$)).subscribe(rows => {
      this.dataSource.data = rows;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  add() {
    this.creating$.next(true)
  }
  delete(r: Row) {
    const clean = o => pipe(
      reject(either(isNil, isEmpty)),
      rmap(when(is(Object), clean))
    )(o)
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const item = clean(r.textProperty)
      this.dataService.deleteProjectTextProperties(pkProject, [item])
    })
  }
  edit(r: Row) {
    this.labelCtrl.setValue(r.textProperty.string)
    this.languageCtrl.setValue(r.language)
    // this.typeCtrl.setValue(r.type)
    this.editing$.next(r.textProperty)
  }
  cancel() {
    this.labelCtrl.setValue(null)
    this.languageCtrl.setValue(null)
    // this.typeCtrl.setValue(null)
    this.editing$.next(null)
    this.creating$.next(null)
  }
  save() {
    if (this.form.valid) {
      combineLatest(this.p.pkProject$, this.editing$).pipe(first()).subscribe(([pkProject, editing]) => {
        const { fk_project, pk_entity } = editing || {} as any;
        const language = this.languageCtrl.value as InfLanguage;
        const model: ProTextProperty = {
          ...editing,
          fk_dfh_class: this.fkClass,
          fk_dfh_property: this.fkProperty,
          fk_dfh_property_domain: this.fkPropertyDomain ?? undefined,
          fk_dfh_property_range: this.fkPropertyRange ?? undefined,
          pk_entity: (pkProject == fk_project) ? pk_entity : undefined,
          fk_project: pkProject,
          string: this.labelCtrl.value,
          fk_language: language.pk_entity,
          fk_system_type: this.fkSystemType,
        }
        this.saving$.next(pk_entity)

        // make sure the language is in store
        this.inf.language.loadSucceeded([language], null, pkProject)

        this.dataService.upsertProjectTextProperties(pkProject, [model])
          .pipe(first(x => !!x)).subscribe(res => {
            this.saving$.next(null)
            this.editing$.next(null)
            this.cancel()
          })
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
