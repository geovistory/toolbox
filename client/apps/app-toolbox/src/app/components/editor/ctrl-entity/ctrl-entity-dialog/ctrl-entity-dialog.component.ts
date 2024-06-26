import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveProjectPipesService, ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldProperty, GvFieldSourceEntity, InfData, InfResource } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { EditModeService } from '../../../../services/edit-mode.service';
import { READ_ONLY } from '../../../../tokens/READ_ONLY';
import { EntityCardComponent } from '../../entity-card/entity-card.component';
import { FormCreateDataComponent } from '../../form-create-data/form-create-data.component';
import { HbfPanelComponent } from '../../hbf-panel/hbf-panel.component';
import { DisableIfHasStatement, SeachExistingEntityConfirmEvent, SeachExistingEntityMoreEvent, SearchExistingEntityComponent } from '../../search-existing-entity/search-existing-entity.component';
import { SliderComponent } from '../../slider/slider.component';
import { CtrlEntityModel } from '../ctrl-entity.component';

export interface CtrlEntityDialogData {
  pkClass: number;
  hiddenProperty: GvFieldProperty
  initVal$: Observable<CtrlEntityModel>
  showAddList: boolean
  disableIfHasStatement?: DisableIfHasStatement,
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
  styleUrls: ['./ctrl-entity-dialog.component.scss'],
  providers: [
    EditModeService,
    { provide: READ_ONLY, useValue: true }
  ],
  standalone: true,
  imports: [SliderComponent, HbfPanelComponent, forwardRef(() => FormCreateDataComponent), MatButtonModule, NgIf, SearchExistingEntityComponent, MatTabsModule, forwardRef(() => EntityCardComponent), AsyncPipe]
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
  selectButtonDisabled: boolean;
  selectButtonTooltip: string;

  constructor(
    private state: StateFacade,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<CtrlEntityDialogComponent, CtrlEntityModel>,
    @Inject(MAT_DIALOG_DATA) public data: CtrlEntityDialogData,
  ) {

    // input checking
    if (!data.pkClass) throw new Error('You must provide classAndTypePk to this dialog')

    this.pkClass$ = of(data.pkClass);
    this.pkClass = data.pkClass;
    this.initVal$ = this.data.initVal$
    if (this.data.defaultSearch) this.searchString$.next(this.get4CharsForEachWords(this.data.defaultSearch));
  }


  ngOnInit() {

    // class label
    this.classLabel$ = this.pkClass$.pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass)),
      takeUntil(this.destroy$)
    );

    // pkProject
    this.pkProject = this.state.pkProject;

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
    if (newStr != '') this.searchString$.next(this.get4CharsForEachWords(newStr))
    else this.searchString$.next(this.get4CharsForEachWords(this.data.defaultSearch))
  }

  private get4CharsForEachWords(str: string | number) {
    return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').map(s => s.slice(0, 4)).join(' ')
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
  onFormOk(form: FormCreateDataComponent) {
    form.submitted = true

    if (form.formFactory.formGroup.valid) {
      const value: InfData = form.formFactory.formGroupFactory.valueChanges$.value
      this.dialogRef.close(value)
    } else {
      const f = form.formFactory.formGroup.controls['childControl'] as UntypedFormArray;
      U.recursiveMarkAsTouched(f)
    }
  }

  onMoreClick(d: SeachExistingEntityMoreEvent) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(d.pkEntity)

    this.selectedInProject$ = this.state.data.war.entityPreview.getEntityPreview.byProjectIdPkEntity$(this.pkProject, d.pkEntity).pipe(
      filter(item => !!item),
      map(item => item.project_id !== 0),
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
