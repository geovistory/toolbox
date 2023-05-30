import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { combineLatest } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { ActiveProjectService } from '../../../core/active-project/active-project.service';
import { C_933_ANNOTATION_IN_TEXT_ID, C_934_ANNOTATION_IN_TABLE_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from '../../../ontome-ids';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ViewFieldComponent } from '../components/view-field/view-field.component';
import { BaseModalsService } from './base-modals.service';

@Injectable({
  providedIn: 'root'
})
export class ViewFieldAddHooksService {

  constructor(
    private p: ActiveProjectService,
    private pp: ActiveProjectPipesService,
    public dataApi: ReduxMainService,
    private dialog: MatDialog,
    private dialogs: BaseModalsService
  ) { }
  public async beforeChoosingClass(viewFieldComponent: ViewFieldComponent): Promise<() => void | void> {
    // add hooks here, that should be applied before class is chosen
    return;
  }

  public async afterChoosingClass(viewFieldComponent: ViewFieldComponent, chosenClass: number): Promise<boolean | void> {
    const field = viewFieldComponent.field;
    const source = viewFieldComponent.source;
    // add hooks here, that should be applied after class is chosen

    /**
     * Hook for creating an annotation in a text, coming from the entity
     */
    if (
      field.property?.fkProperty === P_1875_ANNOTATED_ENTITY_ID &&
      field.isOutgoing === false &&
      chosenClass === C_933_ANNOTATION_IN_TEXT_ID
    ) {
      return this.onAnnotateEntityInText(viewFieldComponent.source)
    }

    /**
     * Hook for creating an annotation in a table, coming from the entity
     */
    if (
      field.property?.fkProperty === P_1875_ANNOTATED_ENTITY_ID &&
      field.isOutgoing === false &&
      chosenClass === C_934_ANNOTATION_IN_TABLE_ID
    ) {
      return this.onAnnotateEntityInTable()
    }

    /**
     * Hook for selecting an item from a platform vocabulary
     */
    if (this.pp.getIsPlatformVocabClass(chosenClass)) {
      return this.dialogs.openSelectPlatformVocabItem(source, field, chosenClass).afterClosed().toPromise()
    }


    /**
     * Hook for has type field
     */
    if (field.isSpecialField == 'has-type') {
      return this.dialogs.openAddHasType(source, field, chosenClass).afterClosed().toPromise()
    }

    return this.dialogs.openAddStatementDialogFromField(source, field, chosenClass).afterClosed().toPromise()

  }



  private onAnnotateEntityInTable() {
    const data: ConfirmDialogData = {
      hideNoButton: true,
      noBtnText: '',
      yesBtnText: 'Ok',
      title: 'Annotations in Table',
      paragraphs: [
        'To annotate entities in tables, you must start from the table.',
        'Refer to the manual for more information.',
      ]
    }
    this.dialog.open(ConfirmDialogComponent, { data })
  }

  private onAnnotateEntityInText(source: GvFieldSourceEntity) {
    this.p.ramReset()
    this.pp.streamEntityPreview(source.fkInfo).pipe(first()).subscribe(e => {
      this.p.ramOnSaveCallback = () => this.onSaveAnnotationCallback(source)
      this.p.ramOpen$.next(true);
      this.p.ramTitle$.next(`Annotate ${e.class_label} – ${e.entity_label}`);
      this.p.ramBoxLeft$.next('select-text');
      this.p.ramProperty$.next(1); // irrelevant since we have a callback
      this.p.ramTarget$.next(source.fkInfo); // irrelevant since we have a callback
      // this.p.ramTitlePart2$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
      this.p.ramBoxRight$.next(true);
      this.p.ramTargetIsFix$.next(true)
    })

  }
  private async onSaveAnnotationCallback(fieldSource: GvFieldSourceEntity): Promise<any> {
    const req = await combineLatest([this.p.pkProject$, this.p.ramSource$.pipe(filter(x => !!x))])
      .pipe(
        map(([pkProject, ramSource]) => {
          const annotation: InfResourceWithRelations = {
            fk_class: C_933_ANNOTATION_IN_TEXT_ID,
            outgoing_statements: [
              {
                fk_property: P_1872_IS_ANNOTATED_IN_ID,
                fk_object_info: ramSource.annotation.pkEntityOfText // Text
              },
              {
                fk_property: P_1874_AT_POSITION_ID,
                object_appellation: ramSource.annotation.textChunk
              },
              {
                fk_property: P_1875_ANNOTATED_ENTITY_ID,
                fk_object_info: fieldSource.fkInfo
              }
            ]
          }
          return { pkProject, annotation }
        }),
        first(),
      )
      .toPromise()

    return this.dataApi.upsertInfResourcesWithRelations(req.pkProject, [req.annotation])
      .pipe(first())
      .toPromise()
  }



}
