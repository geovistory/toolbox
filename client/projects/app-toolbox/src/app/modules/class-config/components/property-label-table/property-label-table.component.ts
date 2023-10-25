import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StateFacade } from '@kleiolab/lib-redux';
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
    private fb: UntypedFormBuilder,
    private state: StateFacade
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
    this.rows$ = combineLatest([
      this.state.data.pro.textProperty.getTextProperty.byFksWithoutLang$({
        fk_project: this.fkProject,
        fk_system_type: this.fkSystemType,
        fk_dfh_class: this.fkClass,
        fk_dfh_property: this.fkProperty,
        fk_dfh_property_domain: this.fkPropertyDomain,
        fk_dfh_property_range: this.fkPropertyRange,
      }).pipe(map((props) => values(props))),
      this.editing$,
      this.saving$,
      this.creating$
    ]).pipe(
      mergeMap(([textProperties, editing, saving, creating]) => combineLatestOrEmpty(
        textProperties
          .map(textProp => this.state.data.inf.language.getLanguage.byPkEntity$(textProp.fk_language)
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

    const item = clean(r.textProperty)
    this.state.data.deleteProjectTextProperties(this.state.pkProject, [item])
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
      this.editing$.pipe(first()).subscribe((editing) => {
        const { fk_project, pk_entity } = editing || {} as any;
        const language = this.languageCtrl.value as InfLanguage;
        const model: ProTextProperty = {
          ...editing,
          fk_dfh_class: this.fkClass,
          fk_dfh_property: this.fkProperty,
          fk_dfh_property_domain: this.fkPropertyDomain ?? undefined,
          fk_dfh_property_range: this.fkPropertyRange ?? undefined,
          pk_entity: (this.state.pkProject == fk_project) ? pk_entity : undefined,
          fk_project: this.state.pkProject,
          string: this.labelCtrl.value,
          fk_language: language.pk_entity,
          fk_system_type: this.fkSystemType,
        }
        this.saving$.next(pk_entity)

        // make sure the language is in store
        this.state.data.inf.language.loadSucceeded([language], null, this.state.pkProject)

        this.state.data.upsertProjectTextProperties(this.state.pkProject, [model])
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
