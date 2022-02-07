import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldId, GvFieldPageScope, GvFieldSourceEntity, InfStatementWithRelations, ProjectDataService, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { fieldToFieldId } from '../base.helpers';

@Injectable({
  providedIn: 'root'
})
export class ViewFieldDropListService {
  connectedToDropLists$ = new BehaviorSubject<CdkDropList<ViewFieldDropListService>[]>([])
  dropZoneAccepts$ = new BehaviorSubject(false)
  itemsOptimisticUpdate$ = new Subject<StatementWithTarget[]>()


  field: Field
  source: GvFieldSourceEntity;
  scope: GvFieldPageScope
  limit$?: BehaviorSubject<number>
  items$?: Observable<StatementWithTarget[]>
  pageIndex$?: BehaviorSubject<number>

  constructor(
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
    private projectDataService: ProjectDataService
  ) { }

  register(
    field: Field,
    source: GvFieldSourceEntity,
    scope: GvFieldPageScope,
    limit$: BehaviorSubject<number>,
    items$: Observable<StatementWithTarget[]>,
    pageIndex$: BehaviorSubject<number>,) {
    this.field = field
    this.source = source
    this.scope = scope
    this.limit$ = limit$
    this.items$ = items$
    this.pageIndex$ = pageIndex$
  }

  async drop(event: CdkDragDrop<any, any, StatementWithTarget>) {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();
    if (event.container !== event.previousContainer) this.moveBetweenFields(event, pkProject);
    else await this.moveInSameField(event);
  }

  /**
   * move item from one field body to another
   * ('this' is the target field body)
   */
  private async moveBetweenFields(event: CdkDragDrop<any, ViewFieldDropListService, StatementWithTarget>, pkProject: number) {
    await this.moveBetweenFieldsOptimistic(event);

    this.moveBetweenFieldsBackend(event, pkProject);
  }

  private async moveBetweenFieldsOptimistic(event: CdkDragDrop<any, ViewFieldDropListService, StatementWithTarget>) {
    // remove optimistically from previous container
    await this.removeFromPreviousContainerOptimistic(event);
    // add optimistically to this container
    await this.addToThisContainerOptimistic(event);
  }

  private async addToThisContainerOptimistic(event: CdkDragDrop<any, ViewFieldDropListService, StatementWithTarget>) {
    if (!this.items$) return;
    const items = await this.items$.pipe(first()).toPromise();
    items.splice(event.currentIndex, 0, event.item.data);
    this.itemsOptimisticUpdate$.next(items);
  }

  private async removeFromPreviousContainerOptimistic(event: CdkDragDrop<any, ViewFieldDropListService, StatementWithTarget>) {
    const previousComponent = event.previousContainer.data;
    if (!previousComponent.items$) return;
    const previousItems = await previousComponent.items$.pipe(first()).toPromise();
    previousItems.splice(event.previousIndex, 1);
    previousComponent.itemsOptimisticUpdate$.next(previousItems);
  }

  private async moveBetweenFieldsBackend(event: CdkDragDrop<any, any, StatementWithTarget>, pkProject: number) {
    const statement = event.item.data.statement;
    // remove the statement from project
    await this.dataService.removeInfEntitiesFromProject([statement.pk_entity], pkProject).pipe(first()).toPromise();

    // use old statement to create a new statement connected to this source
    let newStatement: InfStatementWithRelations;
    const targetPosition = this.calculateTargetPosition(event);
    if (this.field.isOutgoing) {
      newStatement = {
        ...statement,
        pk_entity: undefined,
        fk_subject_info: this.source.fkInfo,
        fk_subject_data: this.source.fkData,
        fk_subject_tables_cell: this.source.fkTablesCell,
        fk_subject_tables_row: this.source.fkTablesRow,
        entity_version_project_rels: [{ ord_num_of_range: targetPosition }]
      };
    } else {
      newStatement = {
        ...statement,
        pk_entity: undefined,
        fk_object_info: this.source.fkInfo,
        fk_object_data: this.source.fkData,
        fk_object_tables_cell: this.source.fkTablesCell,
        fk_object_tables_row: this.source.fkTablesRow,
        entity_version_project_rels: [{ ord_num_of_domain: targetPosition }]
      };
    }
    this.dataService.upsertInfStatementsWithRelations(pkProject, [newStatement]);
  }

  /**
   * move item within this field body
   */
  private async moveInSameField(event: CdkDragDrop<any, any, StatementWithTarget>) {
    await this.moveInSameFieldOptimistic(event.previousIndex, event.currentIndex);
    const targetPosition = this.calculateTargetPosition(event);
    this.moveInSameFieldBackend(targetPosition, event.item.data.statement.pk_entity);
  }

  /**
   * calculates the absolute position item, based on its index on the current page
   * defaults to 1, if if no limit/pageindex given
   *
   * @param event
   * @returns 1-based position
   */
  private calculateTargetPosition(event: CdkDragDrop<any, any, StatementWithTarget>) {

    if (!this.limit$ || !this.pageIndex$) return 1

    return (event.currentIndex + 1) + (this.limit$.value * this.pageIndex$.value);
  }

  /**
   * move item within this field body, doing a optimistic update in frontend
   */
  private async moveInSameFieldOptimistic(previousIndex: number, currentIndex: number) {
    if (!this.items$) return;
    const items = await this.items$.pipe(first()).toPromise();
    moveItemInArray(items, previousIndex, currentIndex);
    this.itemsOptimisticUpdate$.next(items);
  }

  /**
   * move item within this field body, requesting the backend
   * @param targetOrdNum
   * @param movedStatementId
   */
  async moveInSameFieldBackend(targetOrdNum: number, movedStatementId: number) {
    const fieldId: GvFieldId = fieldToFieldId(this.field, this.source, this.scope)

    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise();

    await this.projectDataService.ordNumControllerChangeOrder({
      fieldId,
      movedStatementId,
      pkProject,
      targetOrdNum
    }).pipe(first()).toPromise();
  }
}

