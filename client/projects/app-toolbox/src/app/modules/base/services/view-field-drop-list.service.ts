import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldId, GvFieldPageScope, GvFieldSourceEntity, InfStatement, InfStatementWithRelations, ProjectDataService, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { fieldToFieldId } from '../base.helpers';
import { ViewFieldBodyComponent } from '../components/view-field-body/view-field-body.component';

@Injectable({
  providedIn: 'root'
})
export class ViewFieldDropListService {
  connectedToDropLists$ = new BehaviorSubject<CdkDropList<ViewFieldDropListService>[]>([])
  dropZoneAccepts$ = new BehaviorSubject(false)
  itemsOptimisticUpdate$ = new Subject<StatementWithTarget[]>()



  constructor(
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
    private projectDataService: ProjectDataService
  ) { }





  /**
   * move item from one field body to another
   * ('this' is the target field body)
   */
  async moveBetweenFields(
    previousComponent: ViewFieldBodyComponent,
    previousIndex: number,
    currentComponent: ViewFieldBodyComponent,
    currentIndex: number,
    draggedItem: StatementWithTarget,
  ) {
    const targetPosition = this.calculateTargetPosition(currentComponent, currentIndex);

    this.moveBetweenFieldsBackend(
      currentComponent.field,
      currentComponent.source,
      targetPosition,
      draggedItem.statement,
    );
    return this.moveBetweenFieldsOptimistic(
      previousComponent,
      previousIndex,
      currentComponent,
      currentIndex,
      draggedItem,
    );
  }

  private async moveBetweenFieldsOptimistic(
    previousComponent: ViewFieldBodyComponent,
    previousIndex: number,
    currentComponent: ViewFieldBodyComponent,
    currentIndex: number,
    draggedItem: StatementWithTarget
  ) {
    // remove optimistically from previous container
    const previous = await this.removeFromPreviousContainerOptimistic(previousComponent, previousIndex);
    // add optimistically to this container
    const current = await this.addToThisContainerOptimistic(currentComponent, currentIndex, draggedItem);

    return { previous, current }
  }

  private async addToThisContainerOptimistic(
    currentComponent: ViewFieldBodyComponent,
    currentIndex: number,
    draggedItem: StatementWithTarget
  ) {
    if (!currentComponent.items$) return;
    const items = await currentComponent.items$.pipe(first()).toPromise();
    items.splice(currentIndex, 0, draggedItem);
    // this.itemsOptimisticUpdate$.next(items);
    return items
  }

  private async removeFromPreviousContainerOptimistic(
    previousComponent: ViewFieldBodyComponent,
    previousIndex: number
  ) {
    if (!previousComponent.items$) return;
    const previousItems = await previousComponent.items$.pipe(first()).toPromise();
    previousItems.splice(previousIndex, 1);
    previousComponent.itemsOptimisticUpdate$.next(previousItems);
    return previousItems
  }

  async moveBetweenFieldsBackend(
    field: Field,
    source: GvFieldSourceEntity,
    targetPosition: number,
    statement: InfStatement,

  ) {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();

    // remove the statement from project
    await this.dataService.removeInfEntitiesFromProject([statement.pk_entity], pkProject).pipe(first()).toPromise();

    // use old statement to create a new statement connected to this source
    let newStatement: InfStatementWithRelations;
    if (field.isOutgoing) {
      newStatement = {
        ...statement,
        pk_entity: undefined,
        fk_subject_info: source.fkInfo,
        fk_subject_data: source.fkData,
        fk_subject_tables_cell: source.fkTablesCell,
        fk_subject_tables_row: source.fkTablesRow,
        entity_version_project_rels: [{ ord_num_of_range: targetPosition }]
      };
    } else {
      newStatement = {
        ...statement,
        pk_entity: undefined,
        fk_object_info: source.fkInfo,
        fk_object_data: source.fkData,
        fk_object_tables_cell: source.fkTablesCell,
        fk_object_tables_row: source.fkTablesRow,
        entity_version_project_rels: [{ ord_num_of_domain: targetPosition }]
      };
    }
    this.dataService.upsertInfStatementsWithRelations(pkProject, [newStatement]);
  }


  /**
   * move item within this field body
   */
  async moveInSameField(vfb: ViewFieldBodyComponent, previousIndex: number, currentIndex: number, movedStatementId: number) {
    const targetPosition = this.calculateTargetPosition(vfb, currentIndex);
    this.moveInSameFieldBackend(vfb.field, vfb.source, vfb.scope, targetPosition, movedStatementId);
    return this.moveInSameFieldOptimistic(vfb, previousIndex, currentIndex);
  }

  /**
   * calculates the absolute position item, based on its index on the current page
   * defaults to 1, if if no limit/pageindex given
   *
   * @param event
   * @returns 1-based position
   */
  private calculateTargetPosition(vfb: ViewFieldBodyComponent, currentIndex: number) {

    if (!vfb.limit$ || !vfb.pageIndex$) return 1

    return (currentIndex + 1) + (vfb.limit$.value * vfb.pageIndex$.value);
  }

  /**
   * move item within this field body, doing a optimistic update in frontend
   */
  private async moveInSameFieldOptimistic(vfb: ViewFieldBodyComponent, previousIndex: number, currentIndex: number) {
    if (!vfb.items$) return;
    const items = await vfb.items$.pipe(first()).toPromise();
    moveItemInArray(items, previousIndex, currentIndex);
    return items;
  }

  /**
   * move item within this field body, requesting the backend
   * @param targetOrdNum
   * @param movedStatementId
   */
  async moveInSameFieldBackend(
    field: Field,
    source: GvFieldSourceEntity,
    scope: GvFieldPageScope,
    targetOrdNum: number,
    movedStatementId: number
  ) {
    const fieldId: GvFieldId = fieldToFieldId(field, source, scope)

    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();

    await this.projectDataService.ordNumControllerChangeOrder({
      fieldId,
      movedStatementId,
      pkProject,
      targetOrdNum
    }).pipe(first()).toPromise();
  }
}

