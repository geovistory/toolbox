
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueriesFacade, StateFacade } from '@kleiolab/lib-redux';
import { DfhClassEnriched } from '@kleiolab/lib-redux';
import { ClassConfig, GvPositiveSchemaObject, InfAppellation, ProProject } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData } from '../../shared/components/progress-dialog/progress-dialog.component';
import { BehaviorSubject, Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { TableDetailConfig } from '../../modules/data/components/table-detail/table-detail.component';
import { TextDetail2Config } from '../../modules/data/components/text-detail2/text-detail2.component';
import { EntityDetailConfig } from '../../modules/information/containers/entity-detail/entity-detail.component';


export interface RamSource {
  pkEntity?: number,
  annotation?: {
    textChunk: InfAppellation,
    pkEntityOfText: number
  };
}



@Injectable()
export class ActiveProjectService {
  project: ProProject;

  /***************************************************************
   * Ram (Refers to, Annotated in, Mentioned in)
   ***************************************************************/
  ramOpen$ = new BehaviorSubject(false);
  ramSource$ = new ReplaySubject<RamSource>(1);
  ramProperty$ = new ReplaySubject<number>(1)
  ramTarget$ = new ReplaySubject<number>(1);
  ramTitle$ = new ReplaySubject<string>(1);
  ramTitlePart2$ = new ReplaySubject<string>(1);
  ramBoxLeft$ = new ReplaySubject<'select-text' | 'drag-source-or-section'>(1);
  ramBoxCenter$ = new ReplaySubject<boolean>(1);
  ramBoxRight$ = new ReplaySubject<boolean>(1);
  ramTargetIsFix$ = new BehaviorSubject<boolean>(false);


  requestedEntityPreviews: { [pkEntity: number]: boolean } = {}
  ramOnSaveCallback = async (): Promise<any> => { return };


  constructor(
    private queries: QueriesFacade,
    private state: StateFacade,
    private entityPreviewSocket: EntityPreviewSocket,
    public dialog: MatDialog,
  ) { }


  /************************************************************************************
  * ActiveProject init and destroy
  ************************************************************************************/

  /**
   * Initialize the project in state, if the activeProject is not yet
   * in state or if the pk_project of the activeProject in state
   * is not the one provided
   *
   * @param id pk_project
   */
  initProject(id) {
    const state = this.state.getState();
    if (!state?.ui.activeProject || state?.ui.activeProject.pk_project != id) {
      this.state.data.loadProjectBasics(id).pipe(first()).subscribe(
        () => {
          this.state.ui.activeProject.loadProjectBasiscsSucceded(id)
        }
      )
    }
  }

  /**
   * Initialize the project configuration data
   * this will load all the classes, properties, system configs, etc.
   * needed to edit a project in the toolbox
   *
   * @param id pk_project
   */
  initProjectConfigData(id) {
    const state = this.state.getState()
    if (!state?.ui.activeProject || state?.ui.activeProject.pk_project != id) {
      this.state.data.loadProjectConfiguration(id)
    }
  }

  closeProject() {
    this.entityPreviewSocket.emit('leaveProjectRoom');
    this.state.setState({ data: {}, ui: {} })
  }


  /************************************************************************************
  * Change Project Relations
  ************************************************************************************/

  removeEntityFromProject(pkEntity: number, cb?: (schemaObject: GvPositiveSchemaObject) => any) {
    this.state.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)

      // this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
      const call$ = this.state.data.removeEntityFromProject(pkProject, pkEntity);
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Removing entity from your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: GvPositiveSchemaObject) => {
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
  }

  addEntityToProject(pkEntity: number, cb?: (schemaObject: GvPositiveSchemaObject) => any): Observable<GvPositiveSchemaObject> {
    const s$ = new Subject<GvPositiveSchemaObject>()
    this.state.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)
      // const call$ = this.s.store(this.s.api.addEntityToProject(pkProject, pkEntity), pkProject)
      const call$ = this.state.data.addEntityToProject(pkProject, pkEntity);
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Adding entity to your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: GvPositiveSchemaObject) => {
          s$.next(schemaObject)
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
    return s$;
  }


  /************************************************************************************
  * Mentioning
  ************************************************************************************/

  // updateSelectedChunk(c: DatChunk) {
  //   this.ngRedux.dispatch(this.actions.updateSelectedChunk(c))
  // }

  // setRefiningChunk(bool: boolean) {
  //   this.ngRedux.dispatch(this.actions.setRefiningChunk(bool))
  // }

  // mentioningsFocusedInText(pks: number[]) {
  //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
  // }

  // mentioningsFocusedInTable(pks: number[]) {
  //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
  // }

  ramReset() {
    this.ramOpen$.next(false);
    this.ramSource$.next(undefined);
    this.ramTarget$.next(undefined);
    this.ramProperty$.next(undefined)
    this.ramTitle$.next(undefined)
    this.ramTitlePart2$.next(undefined)
    this.ramBoxLeft$.next(undefined)
    this.ramBoxCenter$.next(false)
    this.ramBoxRight$.next(false)
    this.ramTargetIsFix$.next(false)
    this.ramOnSaveCallback = undefined
  }





  addEntityTabWithoutClass(pkEntity: number) {
    this.queries.activeProject.streamEntityPreview(pkEntity).pipe(first(x => !!x)).subscribe(x => {
      this.addEntityTab(x.pk_entity, x.fk_class)
    })
  }
  addEntityTab(pkEntity: number, pkClass: number) {
    this.queries.configuration.pipeClassEnriched(pkClass).pipe(first(x => !!x)).subscribe(classEnriched => {

      if (classEnriched.detailPage === ClassConfig.DetailPageEnum.Entity) {
        this._addEntityTab(pkEntity, classEnriched)
      }
      else if (classEnriched.detailPage === ClassConfig.DetailPageEnum.Text) {
        this.addText2Tab(pkEntity)
      }
      else if (classEnriched.detailPage === ClassConfig.DetailPageEnum.Table) {
        this.addTableTab(pkEntity)
      }

    })
  }

  private addText2Tab(pkEntity: number) {
    this.state.ui.activeProject.addTab<TextDetail2Config>({
      active: true,
      component: 'text',
      icon: 'text',
      data: {
        pkEntity: pkEntity
      },
      pathSegment: 'textDetails'
    })
  }

  addTableTab(pkEntity: number, fkRow?: number) {
    this.state.ui.activeProject.addTab<TableDetailConfig>({
      active: true,
      component: 'table',
      icon: 'table',
      data: {
        pkEntity: pkEntity,
        filterOnRow: fkRow
      },
      pathSegment: 'tableDetails'
    })
  }




  private _addEntityTab(pkEntity: number, classEnriched: DfhClassEnriched) {
    let config: EntityDetailConfig;
    if (classEnriched.belongsToCategory.sources) {
      config = {
        pkEntity,
        showContentTree: true,
        // showAnnotations: true,
        showFactoids: true,
        showLinkedEntities: true,
        // showLinkedSources: true
      }
    }
    else {
      config = {
        pkEntity,
        showContentTree: false,
        // showAnnotations: true,
        showFactoids: true,
        showLinkedEntities: true,
        // showLinkedSources: true
      }
    }
    this.state.ui.activeProject.addTab<EntityDetailConfig>({
      active: true,
      component: classEnriched.detailPage,
      icon: classEnriched.icon,
      pathSegment: 'peItDetails',
      data: config
    })
  }


  /************************************************************************************
  * Layout -- Modals
  ************************************************************************************/

  /**
   * Opens dialog to get confirmation before removing
   * entity from project. If user confirms, the dialog
   * removes entity and closes
   *
   * @param entityLabel the label of the entity to remove
   * @param pkEntity the pkEntity of the entity to remove
   */
  async openRemoveEntityDialog(entityLabel: string, pkEntity: number): Promise<boolean> {
    const s = new Subject<void>();

    const data: ConfirmDialogData = {
      noBtnText: 'Cancel',
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      title: 'Remove ' + entityLabel,
      paragraphs: ['Are you sure?'],

    }
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise()

    const dialog = this.dialog.open(ConfirmDialogComponent, { data })
    const confirmed = await dialog.afterClosed().pipe(first()).toPromise()

    if (confirmed) {
      await this.state.data.removeEntityFromProject(pkProject, pkEntity)
        .pipe(first(success => !!success)).toPromise()
    }

    return confirmed;
  }

  /**
   * Opens dialog to get confirmation before removing
   * entity from project. If user confirms, the dialog
   * removes entity and the statement and closes
   *
   * @param sourceLabel the label of the source entity of the statement
   * @param fieldLabel the field label
   * @param targetLabel the label of the target entity of the statement
   * @param pkStatement the pk of the statement
   * @param pkEntity the pk of the entity
   * @returns
   */
  async openRemoveStatementAndEntityDialog(
    sourceLabel: string,
    fieldLabel: string,
    targetLabel: string,
    pkStatement: number,
    pkEntity: number,
  ): Promise<boolean> {

    const data: ConfirmDialogData = {
      noBtnText: 'Cancel',
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      title: 'Remove relation and entity',
      paragraphs: [
        `This action will remove from your project:`,
        `the relation: ${sourceLabel} > ${fieldLabel} > ${targetLabel}`,
        `the entity: ${targetLabel}`,
        ``,
        'Are you sure?'
      ],

    }
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise()

    const dialog = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, { data })
    const confirmed = await dialog.afterClosed().pipe(first()).toPromise()

    if (confirmed) {
      await this.state.data.removeEntityFromProject(pkProject, pkEntity)
        .pipe(first(success => !!success)).toPromise()

      await this.state.data.removeInfEntitiesFromProject([pkStatement], pkProject)
        .pipe(first(success => !!success)).toPromise()

    }

    return confirmed;
  }


  /**
   * Opens dialog to get confirmation before removing
   * entity from project. If user confirms, the dialog
   * removes the statement and closes
   *
   * @param sourceLabel the label of the source entity of the statement
   * @param fieldLabel the field label
   * @param targetLabel the label of the target entity of the statement
   * @param pkStatement the pk of the statement
   * @param targetIsLiteral if true, target is literal and the dialog text is shorter
   * @returns
   */
  async openRemoveStatementDialog(
    sourceLabel: string,
    fieldLabel: string,
    targetLabel: string,
    pkStatement: number,
    targetIsLiteral: boolean
  ): Promise<boolean> {

    let paragraphs = [
      `This action will remove this relation from your project:`,
      `${sourceLabel} > ${fieldLabel} > ${targetLabel}`,

    ]
    if (!targetIsLiteral) {
      paragraphs = [
        ...paragraphs,
        `The related entity will remain in your project: ${targetLabel}`
      ]
    }
    paragraphs = [
      ...paragraphs,
      ``,
      'Are you sure?'
    ]
    const data: ConfirmDialogData = {
      noBtnText: 'Cancel',
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      title: 'Remove relation',
      paragraphs
    }
    const pkProject = await this.state.pkProject$.pipe(first()).toPromise()

    const dialog = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(
      ConfirmDialogComponent,
      { data }
    )
    const confirmed = await dialog.afterClosed().pipe(first()).toPromise()

    if (confirmed) {
      await this.state.data.removeInfEntitiesFromProject([pkStatement], pkProject)
        .pipe(first(success => !!success)).toPromise()
    }

    return confirmed;
  }



}
