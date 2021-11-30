import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, WarSelector } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { HitPreview } from '../entity-add-existing-hit/entity-add-existing-hit.component';
import { FormCreateEntityComponent } from '../form-create-entity/form-create-entity.component';


export interface AddEntityDialogData {
  pkClass: number;
}

export type CreateEntityAction = 'alreadyInProjectClicked' | 'notInProjectClicked' | 'created' | 'added';

export interface CreateEntityEvent {
  action: CreateEntityAction,
  pkEntity: number
  pkClass: number
}

@Component({
  selector: 'gv-add-entity-dialog.component',
  templateUrl: './add-entity-dialog.component.html',
  styleUrls: ['./add-entity-dialog.component.scss']
})
export class AddEntityDialogComponent implements OnDestroy, OnInit {
  destroy$ = new Subject<boolean>();

  pkClass$: Observable<number>;
  pkClass: number;
  loading$ = new BehaviorSubject(false);

  // for titles
  classLabel$: Observable<string>;

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

  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    public dialogRef: MatDialogRef<AddEntityDialogComponent, CreateEntityEvent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEntityDialogData,
    private warSelector: WarSelector,
    private dataService: ReduxMainService,
  ) {
    // input checking
    if (!data.pkClass) throw new Error('You must provide classAndTypePk to this dialog')

    this.pkClass$ = of(data.pkClass);
    this.pkClass = data.pkClass;
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
  searchStringChange(term: string) {
    this.searchString$.next(term)
  }


  closeAddForm() {
    this.dialogRef.close();
  }

  onMoreClick(hit: HitPreview) {
    // add to the WS stream and fetch repo and project version
    this.ap.streamEntityPreview(hit.pk_entity)

    this.selectedInProject$ = this.warSelector.entity_preview$.by_project__pk_entity$.key(this.pkProject + '_' + hit.pk_entity).pipe(
      filter(item => !!item),
      map(item => !!item.fk_project),
      startWith(false)
    )

    if (this.sliderView != 'right') {
      this.sliderView = 'right';
      setTimeout(() => {
        this.selectedPkEntity$.next(hit.pk_entity);
      }, 350)
    } else {
      this.selectedPkEntity$.next(hit.pk_entity);
      // this.selectedPkEntity$.next(undefined)
      // setTimeout(() => {
      // }, 0)
    }
  }

  onBackClick() {
    this.sliderView = 'left';
    this.selectedPkEntity$.next(undefined);
  }

  openEntity() {
    this.p.addEntityTab(this.selectedPkEntity$.value, this.pkClass);
    this.closeDialog();
  }

  addEntityToProject() {
    this.p.addEntityToProject(this.selectedPkEntity$.value, () => {
      this.dialogRef.close({
        action: 'added',
        pkEntity: this.selectedPkEntity$.value,
        pkClass: this.pkClass
      })
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onSubmit(f: FormCreateEntityComponent) {
    if (!f.checkValidation()) return;

    this.loading$.next(true);

    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const value = f.formFactory.formGroupFactory.valueChanges$.value
      let upsert$: Observable<GvSchemaModifier>;

      if (value.resource) {
        upsert$ = this.dataService.upsertInfResourcesWithRelations(pkProject, [value.resource])
      }
      //  else if (value.statement) {
      //   if (this.field.isOutgoing) value.statement.fk_subject_info = this.source.fkInfo;
      //   else value.statement.fk_object_info = this.source.fkInfo;
      //   upsert$ = this.dataService.upsertInfStatementsWithRelations(pkProject, [value.statement])

      // }
      else throw new Error(`Submitting ${value} is not implemented`);


      // upsert$.pipe(takeUntil(this.destroy$))
      //   .subscribe((res: GvSchemaModifier) => {
      //     if (res) {
      //       if (value.resource) {
      //         if (!res.positive.inf.resource.length) throw new Error('bad result')
      //         this.saved.emit(res.positive.inf.resource[0])
      //       }
      //       this.saving = false;
      //     }
      //   })


      upsert$.pipe(takeUntil(this.destroy$))
        .subscribe((res: GvSchemaModifier) => {
          if (res) {
            if (value.resource) {
              if (!res.positive.inf.resource.length) throw new Error('bad result')

              this.dialogRef.close({
                action: 'created',
                pkEntity: res.positive.inf.resource[0].pk_entity,
                pkClass: this.pkClass
              })
            }
          }
        })
    })
  }

}
