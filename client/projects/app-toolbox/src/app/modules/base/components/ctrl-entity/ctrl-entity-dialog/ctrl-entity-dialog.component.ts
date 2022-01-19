import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, WarSelector } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldProperty, GvFieldSourceEntity, InfResource, WarEntityPreviewControllerService } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { FormCreateDataComponent } from '../../form-create-data/form-create-data.component';
import { DisableIfHasStatement, SeachExistingEntityConfirmEvent, SeachExistingEntityMoreEvent } from '../../search-existing-entity/search-existing-entity.component';
import { CtrlEntityModel } from '../ctrl-entity.component';

export interface CtrlEntityDialogData {
  pkClass: number;
  hiddenProperty: GvFieldProperty
  initVal$: Observable<CtrlEntityModel>
  showAddList: boolean
  disableIfHasStatement: DisableIfHasStatement,
  defaultSearch: string;
}

export type CreateOrAddEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added';
export type NotInProjectClickBehavior = 'addToProject' | 'selectOnly';

export interface CreateOrAddEntityEvent {
  action: CreateOrAddEntityAction,
  pkEntity: number
  pkClass: number
}

@Component({
  selector: 'gv-ctrl-entity-dialog',
  templateUrl: './ctrl-entity-dialog.component.html',
  styleUrls: ['./ctrl-entity-dialog.component.scss']
})
export class CtrlEntityDialogComponent implements OnDestroy, OnInit {
  destroy$ = new Subject<boolean>();

  pkClass$: Observable<number>;
  pkClass: number;

  // for titles
  classLabel$: Observable<string>;

  // for the slider
  sliderView: 'right' | 'left' = 'left';

  // for the form-create-entity
  initVal$: Observable<InfResource>

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
  selectButtonDisabled: boolean;
  selectButtonTooltip: string;

  @ViewChild(FormCreateDataComponent, { static: true }) createEntity: FormCreateDataComponent;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<CtrlEntityDialogComponent, CtrlEntityModel>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlEntityDialogData,
    private warSelector: WarSelector,
    private entityPreviewApi: WarEntityPreviewControllerService,
  ) {

    // input checking
    if (!data.pkClass) throw new Error('You must provide classAndTypePk to this dialog')

    this.pkClass$ = of(data.pkClass);
    this.pkClass = data.pkClass;
    this.initVal$ = this.data.initVal$.pipe(map(v => v ? v.resource : null));

    if (this.data.defaultSearch) this.searchString$.next(this.data.defaultSearch);
  }


  ngOnInit() {

    // class label
    this.classLabel$ = this.pkClass$.pipe(
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
  }

  /**
   * gets called on change of the search string.
   */
  searchStringChange(newStr: string) {
    if (newStr != "") this.searchString$.next(newStr)
    else this.searchString$.next(this.data.defaultSearch)
  }

  // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
  onCreated(entity: InfResource) {
    this.onCreateOrAdd({
      action: 'created',
      pkEntity: entity.pk_entity,
      pkClass: this.pkClass
    })
  }

  onCreateOrAdd(res) {
    this.dialogRef.close(res);
  }

  // When user confirms that the form is filled
  onFormOk() {
    this.createEntity.submitted = true

    if (this.createEntity.formFactory.formGroup.valid) {
      const value: CtrlEntityModel = this.createEntity.formFactory.formGroupFactory.valueChanges$.value
      this.dialogRef.close(value)
    } else {
      const f = this.createEntity.formFactory.formGroup.controls.childControl as FormArray;
      U.recursiveMarkAsTouched(f)
    }
  }

  onMoreClick(d: SeachExistingEntityMoreEvent) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(d.pkEntity)

    this.selectedInProject$ = this.warSelector.entity_preview$.by_project__pk_entity$.key(this.pkProject + '_' + d.pkEntity).pipe(
      filter(item => !!item),
      map(item => !!item.fk_project),
      startWith(false)
    )

    this.selectButtonDisabled = d.hit.confirmBtnDisabled;
    this.selectButtonTooltip = d.hit.confirmBtnTooltip;

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

  /**
   * on select existing entity from 2nd slide
   */
  onSelectExisting(d: SeachExistingEntityConfirmEvent) {
    this.dialogRef.close({ pkEntity: d.pkEntity });
  }

  /**
  * on select existing entity from 3rd slide
  */
  selectEntity() {
    this.dialogRef.close({ pkEntity: this.selectedPkEntity$.value });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
