import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, FieldTargetClass, WarSelector } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvFieldPageScope, GvFieldProperty, GvFieldSourceEntity, InfStatementWithRelations, SubfieldPageControllerService, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets, fieldToWarFieldChangeId } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { HitPreview } from '../entity-add-existing-hit/entity-add-existing-hit.component';
import { FormCreateEntityComponent } from '../form-create-entity/form-create-entity.component';

export interface AddStatementDialogData {
  field: Field;
  targetClass: number;
  valueTarget: boolean;

  // primary key of the source entity
  source: GvFieldSourceEntity;
  hiddenProperty: GvFieldProperty
}

@Component({
  selector: 'gv-add-statement-dialog',
  templateUrl: './add-statement-dialog.component.html',
  styleUrls: ['./add-statement-dialog.component.scss']
})
export class AddStatementDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  pkClass_target$: Observable<number>;
  pkClass_target: number;
  pkClass_source$: Observable<number>;
  sourceEntityLabel$: Observable<string>;
  fieldWithOneTarget: Field;
  fieldTargetClass: FieldTargetClass;
  loading$ = new BehaviorSubject(false);
  scope$: Observable<GvFieldPageScope>

  // if the entity already has a statement in another project
  alreadyHas$: Observable<boolean>;
  next$ = new BehaviorSubject(false);
  addMode$ = new BehaviorSubject(true);
  readonly$ = new BehaviorSubject(true);

  // for titles
  classLabel$: Observable<string>;
  classLabel_source$: Observable<string>;
  classLabel_target$: Observable<string>;
  pkEntity_source: number;

  // for the slider
  sliderView: 'right' | 'left' = 'left';

  // for the search-entity-list
  searchInput: string;
  searchString$ = new BehaviorSubject<string>('');
  selectedPkEntity$ = new BehaviorSubject<number>(undefined);
  selectedInProject$: Observable<boolean>;

  // for entity card
  pkProject: number;
  showOntoInfo$ = new BehaviorSubject(false);
  entityCardReadOnly$ = new BehaviorSubject(true);
  entityCardScope: GvFieldPageScope;
  source$: Observable<GvFieldSourceEntity>;

  constructor(
    public p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    public c: ConfigurationPipesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddStatementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddStatementDialogData,
    public paginationApi: SubfieldPageControllerService,
    private dataService: ReduxMainService,
    private paginationService: PaginationService,
    private warSelector: WarSelector
  ) {
    this.pkClass_target$ = of(data.targetClass);
    this.pkClass_target = data.targetClass;
    this.pkEntity_source = data.source.fkInfo;
    this.pkClass_source$ = of(data.field.sourceClass)

    // restrict the add dialog to only one class
    this.fieldTargetClass = this.data.field.targets[this.data.targetClass]
    if (!this.fieldTargetClass) throw new Error('target type is not retrievable for class: ' + this.data.targetClass);
    this.fieldWithOneTarget = {
      ...this.data.field,
      targets: { [this.data.targetClass]: this.fieldTargetClass }
    }

    // for the already existing statements
    this.scope$ = this.p.pkProject$.pipe(map(pkProject => ({ notInProject: pkProject })))
  }

  ngOnInit() {

    // source entity label
    this.sourceEntityLabel$ = this.ap.streamEntityPreview(this.pkEntity_source)
      .pipe(
        map(ep => ep.entity_label),
        takeUntil(this.destroy$)
      )

    // class labels
    this.classLabel$ = this.pkClass_target$.pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass)),
      takeUntil(this.destroy$)
    );
    this.classLabel_source$ = this.pkClass_source$.pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass)),
      takeUntil(this.destroy$)
    );
    this.classLabel_target$ = this.pkClass_target$.pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass)),
      takeUntil(this.destroy$)
    );

    // pkProject
    this.p.pkProject$.pipe(takeUntil(this.destroy$))
      .subscribe(n => this.pkProject = n);

    // create the source for the gv-entity-card
    this.source$ = this.selectedPkEntity$.pipe(
      map(pkEntity => (pkEntity ? { fkInfo: pkEntity } : undefined)),
      takeUntil(this.destroy$)
    )

    // get count from rest api first
    this.alreadyHas$ =
      combineLatest([this.p.pkProject$, this.next$]).pipe(
        // first(),
        switchMap(([pkProject, next]) => {
          if (next) return of(0);
          const req: GvFieldPageReq = {
            pkProject,
            targets: fieldToGvFieldTargets(this.fieldWithOneTarget),
            page: fieldToFieldPage(this.fieldWithOneTarget, this.data.source, { notInProject: pkProject }, 0, 0)
          }
          return this.paginationApi.subfieldPageControllerLoadSubfieldPage(req).pipe(
            map(res => res.subfieldPages[0].count)
          )
        }),
        map(c => c !== 0),
        shareReplay(),
        startWith()
      )

    this.alreadyHas$.subscribe(r => console.log('1', r))
    this.next$.subscribe(r => console.log('2', r))


  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, fkInfo, field);
    this.paginationService.reloadPagesOfField(fieldId);
  }

  onClose() {
    this.dialogRef.close()
  }

  onSaved() {
    this.triggerPageReloads(this.pkProject, this.data.source.fkInfo, this.data.field)
    this.onClose()
  }

  onSelect() {
    this.loading$.next(true)
    const ff = this.fieldWithOneTarget;

    // create the statement to add
    const r: Partial<InfStatementWithRelations> = {}
    if (ff.isOutgoing) {
      r.fk_subject_info = this.data.source.fkInfo
      r.object_resource = { pk_entity: this.selectedPkEntity$.value, fk_class: this.pkClass_target }
    } else {
      r.fk_object_info = this.data.source.fkInfo
      r.subject_resource = { pk_entity: this.selectedPkEntity$.value, fk_class: this.pkClass_target }
    }
    r.fk_property = ff.property.fkProperty;
    r.fk_property_of_property = ff.property.fkPropertyOfProperty;

    this.dataService.upsertInfStatementsWithRelations(this.pkProject, [r])
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => this.onSaved());
  }


  // onSubmit(resource: Partial<InfResource>) {
  onSubmit(f: FormCreateEntityComponent) {
    if (!f.checkValidation()) return;

    this.loading$.next(true)
    const value = f.formFactory.formGroupFactory.valueChanges$.value;
    let statement: Partial<InfStatementWithRelations> = {}

    if (value.resource) {
      // create the statement to add
      if (this.fieldWithOneTarget.isOutgoing) {
        statement.fk_subject_info = this.data.source.fkInfo;
        statement.object_resource = value.resource;
      } else {
        statement.fk_object_info = this.data.source.fkInfo
        statement.subject_resource = value.resource;
      }
      statement.fk_property = this.fieldWithOneTarget.property.fkProperty;
      statement.fk_property_of_property = this.fieldWithOneTarget.property.fkPropertyOfProperty;
    } else {
      statement = value.statement
      if (this.fieldWithOneTarget.isOutgoing) statement.fk_subject_info = this.data.source.fkInfo;
      else statement.fk_object_info = this.data.source.fkInfo
    }

    this.dataService.upsertInfStatementsWithRelations(this.pkProject, [statement])
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => this.onSaved());
  }


  onNext() {
    this.next$.next(true);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onMoreClick(hit: HitPreview) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(hit.pk_entity)

    this.selectedInProject$ = this.warSelector.entity_preview$.by_project__pk_entity$.key(this.pkProject + '_' + hit.pk_entity).pipe(
      map(item => !!item?.fk_project),
      startWith(false)
    )

    if (this.sliderView != 'right') {
      this.sliderView = 'right';
      setTimeout(() => {
        this.selectedPkEntity$.next(hit.pk_entity);
      }, 350)
    } else {
      this.selectedPkEntity$.next(undefined)
      setTimeout(() => {
        this.selectedPkEntity$.next(hit.pk_entity);
      }, 0)
    }
  }

  onBackClick() {
    this.sliderView = 'left';
    this.selectedPkEntity$.next(undefined);
  }
}