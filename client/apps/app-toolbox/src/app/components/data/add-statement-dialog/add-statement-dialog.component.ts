import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, FieldTargetClass, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvFieldPageScope, GvFieldProperty, GvFieldSourceEntity, InfData, InfStatementWithRelations, StatementWithTarget, SubfieldPageControllerService, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { first, map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets, fieldToWarFieldChangeId, statemenTargetToInfData } from '../../../lib/converters/base.helpers';
import { ActiveProjectService } from '../../../services/active-project.service';
import { EditModeService } from '../../../services/edit-mode.service';
import { PaginationService } from '../../../services/pagination.service';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import { EntityCardComponent } from '../entity-card/entity-card.component';
import { FormCreateDataComponent } from '../form-create-data/form-create-data.component';
import { HbfPanelComponent } from '../hbf-panel/hbf-panel.component';
import { SeachExistingEntityConfirmEvent, SeachExistingEntityMoreEvent, SearchExistingEntityComponent } from '../search-existing-entity/search-existing-entity.component';
import { SliderComponent } from '../slider/slider.component';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';

export interface AddStatementDialogData {
  field: Field;
  targetClass: number;
  showAddList: boolean;


  // if a statement with target (item in a field body)
  // is provided, the target (object/subject) will be used
  // as init value for the form
  // when the user saves the form, remove the provided
  // statement from the project (only the statement)
  toBeReplaced?: StatementWithTarget

  // primary key of the source entity
  source: GvFieldSourceEntity;
  hiddenProperty: GvFieldProperty
}

@Component({
  selector: 'gv-add-statement-dialog',
  templateUrl: './add-statement-dialog.component.html',
  styleUrls: ['./add-statement-dialog.component.scss'],
  providers: [
    EditModeService,
    { provide: READ_ONLY, useValue: true }
  ],
  standalone: true,
  imports: [NgIf, forwardRef(() => ViewFieldBodyComponent), MatIconModule, MatDividerModule, SliderComponent, HbfPanelComponent, forwardRef(() => FormCreateDataComponent), MatButtonModule, MatProgressSpinnerModule, SearchExistingEntityComponent, MatTabsModule, forwardRef(() => EntityCardComponent), AsyncPipe]
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
  readmode$ = new BehaviorSubject(true);

  // for titles
  classLabel$: Observable<string>;
  classLabel_source$: Observable<string>;
  classLabel_target$: Observable<string>;
  pkEntity_source: number;

  // for the slider
  sliderView: 'right' | 'left' = 'left';

  // for the form
  initVal$: Observable<InfData>

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
    private state: StateFacade,
    private paginationService: PaginationService,
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
    this.scope$ = this.state.pkProject$.pipe(map(pkProject => ({ notInProject: pkProject })))

    // assign init value for the form

    if (data.toBeReplaced) {
      const d = statemenTargetToInfData(data.toBeReplaced.target)
      this.initVal$ = of(d)
    }


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
    this.state.pkProject$.pipe(takeUntil(this.destroy$))
      .subscribe(n => this.pkProject = n);

    // create the source for the gv-entity-card
    this.source$ = this.selectedPkEntity$.pipe(
      map(pkEntity => (pkEntity ? { fkInfo: pkEntity } : undefined)),
      takeUntil(this.destroy$)
    )

    // get count from rest api first
    this.alreadyHas$ =
      combineLatest([this.state.pkProject$, this.next$]).pipe(
        // first(),
        switchMap(([pkProject, next]) => {
          if (next) return of(0);
          const req: GvFieldPageReq = {
            pkProject,
            targets: fieldToGvFieldTargets(this.fieldWithOneTarget),
            page: fieldToFieldPage(this.fieldWithOneTarget, this.data.source, { notInProject: pkProject }, 0, 0)
          }
          return this.paginationApi.subfieldPageControllerLoadSubfieldPages([req]).pipe(
            map(res => res.subfieldPages[0].count)
          )
        }),
        map(c => c !== 0),
        shareReplay(),
        startWith()
      )
  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(term: string) {
    this.searchString$.next(this.get4CharsForEachWords(term))
  }

  private get4CharsForEachWords(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').map(s => s.slice(0, 4)).join(' ')
  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, { fkInfo }, field.property, field.isOutgoing);
    this.paginationService.reloadPagesOfField(fieldId);
  }


  /**
   * On submit of the 1st slide
   *
   * upserts a statement, where the new resource or value given by
   * the form, is the target
   * @param f
   * @returns
   */
  onSubmit(f: FormCreateDataComponent) {
    if (!f.checkValidation()) return;

    this.loading$.next(true)
    const value = f.formFactory.formGroupFactory.valueChanges$.value;
    const isOutgoing = this.fieldWithOneTarget.isOutgoing

    // add the ord num, so that the statement is added at first position of field
    let statement: Partial<InfStatementWithRelations> = isOutgoing ?
      { entity_version_project_rels: [{ ord_num_of_range: 1 }] } :
      { entity_version_project_rels: [{ ord_num_of_domain: 1 }] }

    if (!value.statement) {
      // create the statement to add
      if (isOutgoing) {
        statement.fk_subject_info = this.data.source.fkInfo;
        statement.object_resource = value.resource;
        statement.object_appellation = value.appellation;
        statement.object_dimension = value.dimension;
        statement.object_lang_string = value.langString;
        statement.object_language = value.language;
        statement.object_place = value.place;
        statement.object_time_primitive = value.timePrimitive
      } else {
        statement.fk_object_info = this.data.source.fkInfo
        statement.subject_resource = value.resource;
      }
      statement.fk_property = this.fieldWithOneTarget.property.fkProperty;
      statement.fk_property_of_property = this.fieldWithOneTarget.property.fkPropertyOfProperty;

    } else if (value.statement) {
      statement = value.statement
      if (isOutgoing) statement.fk_subject_info = this.data.source.fkInfo;
      else statement.fk_object_info = this.data.source.fkInfo
    }

    this.finalize(statement)
  }

  /**
   * On select existing from the 2nd slide
   */
  onSelectExisting(d: SeachExistingEntityConfirmEvent) {
    this.upsertSelected(d.pkEntity)
  }

  /**
   * On select existing from the 3rd slide
   */
  onSelect() {
    const pkEntity = this.selectedPkEntity$.value;
    this.upsertSelected(pkEntity);
  }

  /**
   * upserts a statement, where the selected existing entity is the target
   * @param pkEntity
   */
  async upsertSelected(pkEntity: number) {
    this.loading$.next(true)
    const ff = this.fieldWithOneTarget;
    // create the statement to add
    const r: Partial<InfStatementWithRelations> = {};
    if (ff.isOutgoing) {
      r.fk_subject_info = this.data.source.fkInfo;
      r.object_resource = { pk_entity: pkEntity, fk_class: this.pkClass_target };
    } else {
      r.fk_object_info = this.data.source.fkInfo;
      r.subject_resource = { pk_entity: pkEntity, fk_class: this.pkClass_target };
    }
    r.fk_property = ff.property.fkProperty;
    r.fk_property_of_property = ff.property.fkPropertyOfProperty;

    await this.finalize(r);
  }


  private async finalize(s: Partial<InfStatementWithRelations>) {
    if (this.data.toBeReplaced) {
      // we need to await this, because, if the user saves without modifying the
      // form, the upsert function below will use the existing statement and add
      // it again to the project. For this reason, remove must be done before upsert
      await this.state.data.removeEntityFromProject(
        this.pkProject,
        this.data.toBeReplaced.statement.pk_entity
      ).pipe(first()).toPromise()

      // add the ord-num to the new statement, to keep its position
      s.entity_version_project_rels = this.data.field.isOutgoing ?
        [{ ord_num_of_range: this.data.toBeReplaced.ordNum }] :
        [{ ord_num_of_domain: this.data.toBeReplaced.ordNum }]
    }
    await this.state.data.upsertInfStatementsWithRelations(this.pkProject, [s])
      .pipe(first()).toPromise();

    this.onSaved();
  }

  onNext() {
    this.next$.next(true);
  }

  onClose(e: boolean) {
    this.dialogRef.close(e)
  }

  onSaved() {
    this.triggerPageReloads(this.pkProject, this.data.source.fkInfo, this.data.field)
    this.dialogRef.close(true)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onMoreClick(d: SeachExistingEntityMoreEvent) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(d.pkEntity)

    this.selectedInProject$ = this.state.data.war.entityPreview.getEntityPreview.byProjectIdPkEntity$(this.pkProject, d.pkEntity).pipe(
      map(item => item?.project_id !== 0),
      startWith(false)
    )

    if (this.sliderView != 'right') {
      this.sliderView = 'right';
      setTimeout(() => {
        this.selectedPkEntity$.next(d.pkEntity);
      }, 350)
    } else {
      this.selectedPkEntity$.next(undefined)
      setTimeout(() => {
        this.selectedPkEntity$.next(d.pkEntity);
      }, 0)
    }
  }

  onBackClick() {
    this.sliderView = 'left';
    this.selectedPkEntity$.next(undefined);
  }
}
