import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, SysSelector, WarSelector } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvSchemaModifier, InfData, InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { FormCreateDataComponent } from '../form-create-data/form-create-data.component';
import { SeachExistingEntityMoreEvent } from '../search-existing-entity/search-existing-entity.component';
import { SliderEnum } from '../slider/slider.component';


export interface AddEntityOrValueDialogData {
  pkClass: number;
  initVal?: InfResourceWithRelations;

  insteadOfCreationHook?: () => {
    pkEntity?: number, // this is the pkEntity of an existing resource
    infData?: InfData // this contains the
  }

  selectMode?: boolean;
}

export type CreateEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added' | 'selected';

export interface CreateEntityEvent {
  action: CreateEntityAction,
  pkEntity: number
  pkClass: number
}

@Component({
  selector: 'gv-add-entity-or-value-dialog.component',
  templateUrl: './add-entity-or-value-dialog.component.html',
  styleUrls: ['./add-entity-or-value-dialog.component.scss'],
  providers: [
    { provide: READ_ONLY, useValue: true }
  ]
})
export class AddEntityOrValueDialogComponent implements OnDestroy, OnInit {
  destroy$ = new Subject<boolean>();

  pkClass$: Observable<number>;
  pkClass: number;
  loading$ = new BehaviorSubject(false);

  // for titles
  classLabel$: Observable<string>;

  // for the slider
  sliderView: SliderEnum = SliderEnum.left;

  // for the search-entity-list
  searchInput: string;
  searchString$ = new BehaviorSubject<string>('');
  selectedPkEntity$ = new BehaviorSubject<number>(undefined);
  selectedInProject$: Observable<boolean>;

  // for entity card
  pkProject: number;
  showOntoInfo$ = new BehaviorSubject(false);
  entityCardScope: GvFieldPageScope;
  source$: Observable<GvFieldSourceEntity>;
  initVal$: Observable<InfResourceWithRelations>

  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<AddEntityOrValueDialogComponent, CreateEntityEvent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEntityOrValueDialogData,
    private warSelector: WarSelector,
    private dataService: ReduxMainService,
    private sys: SysSelector,
  ) {
    // input checking
    if (!data.pkClass) throw new Error('You must provide classAndTypePk to this dialog')

    this.pkClass$ = of(data.pkClass);
    this.pkClass = data.pkClass;
    if (data.initVal) this.initVal$ = of(data.initVal)
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

    // if it is a value, we don't need the addList
    this.sys.config$.main$.pipe(takeUntil(this.destroy$)).subscribe(config => {
      const configOfClass = config.classes[this.pkClass]
      if (configOfClass && configOfClass.valueObjectType) return this.sliderView = SliderEnum.center
      else this.sliderView = SliderEnum.left
    })
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

  closeAddForm() {
    this.dialogRef.close();
  }

  onMoreClick(d: SeachExistingEntityMoreEvent) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(d.pkEntity)

    this.selectedInProject$ = this.warSelector.entity_preview$.by_project__pk_entity$.key(this.pkProject + '_' + d.pkEntity).pipe(
      filter(item => !!item),
      map(item => !!item.fk_project),
      startWith(false)
    )

    if (this.sliderView != SliderEnum.right) {
      this.sliderView = SliderEnum.right;
      setTimeout(() => {
        this.selectedPkEntity$.next(d.pkEntity);
      }, 350)
    } else {
      this.selectedPkEntity$.next(d.pkEntity);
      // this.selectedPkEntity$.next(undefined)
      // setTimeout(() => {
      // }, 0)
    }
  }

  onBackClick() {
    this.sliderView = SliderEnum.left;
    this.selectedPkEntity$.next(undefined);
  }

  onConfirmClick(d: { pkEntity: number, isInProject: boolean }) {
    // insteadOfCreationCallback, if provided and return

    this.selectedPkEntity$.next(d.pkEntity)
    if (d.isInProject) this.openEntity()
    else this.addEntityToProject()
  }

  openEntity() {
    this.p.addEntityTab(this.selectedPkEntity$.value, this.pkClass);
    this.closeDialog();
  }

  addEntityToProject() {
    // insteadOfCreationCallback, if provided and return

    this.p.addEntityToProject(this.selectedPkEntity$.value, () => {
      this.dialogRef.close({
        action: 'added',
        pkEntity: this.selectedPkEntity$.value,
        pkClass: this.pkClass
      })
    })
  }

  selectEntity(d: { pkEntity: number, isInProject: boolean }) {
    // insteadOfCreationCallback, if provided and return

    this.selectedPkEntity$.next(d.pkEntity)
    if (d.isInProject || !d) {
      this.dialogRef.close({
        action: 'selected',
        pkEntity: this.selectedPkEntity$.value,
        pkClass: this.pkClass
      })
    }
    else this.addEntityToProject()
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  async onSubmit(f: FormCreateDataComponent) {
    if (!f.checkValidation()) return;

    this.loading$.next(true);

    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise()

    // insteadOfCreationCallback, if provided and return

    const value = f.formFactory.formGroupFactory.valueChanges$.value

    this.dataService.upsertInfData(pkProject, value).pipe(takeUntil(this.destroy$))
      .subscribe((res: GvSchemaModifier) => {
        const inf = res.positive.inf;
        const mainPkEntity = (inf.resource ?? inf.statement ?? inf.appellation ?? inf.place ?? inf.dimension ?? inf.time_primitive ?? inf.lang_string ?? inf.language)[0].pk_entity

        this.dialogRef.close({
          action: 'created',
          pkEntity: mainPkEntity,
          pkClass: this.pkClass
        })
      })

  }

}
