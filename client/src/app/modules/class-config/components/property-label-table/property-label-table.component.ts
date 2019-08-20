import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { MatTableDataSource } from '../../../../../../node_modules/@angular/material';
import { BehaviorSubject, combineLatest, Observable, Subject } from '../../../../../../node_modules/rxjs';
import { map, mergeMap, takeUntil, first } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfLanguage, ProPropertyLabel } from '../../../../core';
import { InformationPipesService } from '../../../information/new-services/information-pipes.service';
import { ProActions } from '../../../../core/pro/pro.actions';
import { ConfigurationPipesService } from '../../../information/new-services/configuration-pipes.service';

interface Row {

  propertyLabel: ProPropertyLabel
  language: InfLanguage
  editMode: boolean;
  saving: boolean
  label: string,
  languageLabel: string
  type: string
}
@Component({
  selector: 'gv-property-label-table',
  templateUrl: './property-label-table.component.html',
  styleUrls: ['./property-label-table.component.scss']
})
export class PropertyLabelTableComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() fkProperty: number
  @Input() fkDomainClass: number
  @Input() fkRangeClass: number

  editing$ = new BehaviorSubject<ProPropertyLabel>(null) // pk_entity of ProPropertyLabel being edited
  saving$ = new BehaviorSubject<number>(null)
  rows$: Observable<Row[]>
  creating$ = new BehaviorSubject<boolean>(false)
  dataSource = new MatTableDataSource<Row>()
  displayedColumns = ['label', 'language', 'type', 'actions'];

  labelCtrl = new FormControl('', [Validators.required])
  languageCtrl = new FormControl(null, [Validators.required])
  typeCtrl = new FormControl('singular', [Validators.required])
  form: FormGroup = this.fb.group({
    labelCtrl: this.labelCtrl,
    langugageCtrl: this.languageCtrl,
    typeCtrl: this.typeCtrl
  })

  constructor(
    private c: ConfigurationPipesService,
    private p: ActiveProjectService,
    private fb: FormBuilder,
    private pro: ProActions
  ) { }

  ngOnInit() {

    this.rows$ = combineLatest(
      this.c.pipeDefaultLabelsOfProperty(this.fkProperty, this.fkDomainClass, this.fkRangeClass),
      this.editing$,
      this.saving$,
      this.creating$
    ).pipe(
      mergeMap(([labels, editing, saving, creating]) => combineLatest(
        labels.map(propertyLabel => this.p.inf$.language$.by_pk_entity$.key(propertyLabel.fk_language)
          .pipe(
            map(language => {

              const row: Row = {
                editMode: editing && propertyLabel.pk_entity === editing.pk_entity,
                saving: saving == propertyLabel.pk_entity,
                propertyLabel,
                language,
                label: propertyLabel.label,
                languageLabel: language.notes,
                type: propertyLabel.fk_system_type === 180 || propertyLabel.fk_system_type === 182 ? 'singular' : 'plural'
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
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      this.pro.property_label.delete([r.propertyLabel], pkProject)
    })
  }
  edit(r: Row) {
    this.labelCtrl.setValue(r.propertyLabel.label)
    this.languageCtrl.setValue(r.language)
    this.typeCtrl.setValue(r.type)
    this.editing$.next(r.propertyLabel)
  }
  cancel() {
    this.labelCtrl.setValue(null)
    this.languageCtrl.setValue(null)
    this.typeCtrl.setValue(null)
    this.editing$.next(null)
    this.creating$.next(null)
  }
  save() {
    if (this.form.valid) {
      combineLatest(this.p.pkProject$, this.editing$).pipe(first()).subscribe(([pkProject, editing]) => {
        const propertyLabel = editing || {
          fk_property: this.fkProperty,
          fk_domain_class: this.fkDomainClass,
          fk_range_class: this.fkRangeClass
        } as ProPropertyLabel;

        const model: ProPropertyLabel = {
          ...propertyLabel,
          pk_entity: (pkProject == propertyLabel.fk_project) ? propertyLabel.pk_entity : null,
          fk_project: pkProject,
          label: this.labelCtrl.value,
          fk_language: (this.languageCtrl.value as InfLanguage).pk_entity,
          fk_system_type: this.fkDomainClass ? (this.typeCtrl.value === 'singular' ? 180 : 181) : (this.typeCtrl.value === 'singular' ? 182 : 183),
        }
        this.saving$.next(propertyLabel.pk_entity)
        this.pro.property_label.upsert([model], pkProject).resolved$.pipe(first(x => !!x)).subscribe(res => {
          this.saving$.next(null)
          this.editing$.next(null)
          this.cancel()
        })
      })
    }
  }
}
