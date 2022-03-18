import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { DatActions, ReduxMainService, SucceedActionMeta } from '@kleiolab/lib-redux';
import { DatDigital, DatNamespace, GvPositiveSchemaObject, InfStatement, InfStatementWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable } from 'rxjs';
import { ContentTreeNode } from './content-tree.component';

@Injectable()
// named it 'NgContentTreeService' instead of 'ContentTreeService' to avoid confusion with
// ContentTreeService from @kleiolab/lib-sdk-lb4
export class NgContentTreeService {
  pkProject$: Observable<number>
  datNamespaces$: Observable<DatNamespace[]>
  constructor(
    protected aps: ActiveProjectService,
    protected ap: ActiveProjectPipesService,
    protected reduxMain: ReduxMainService,
    protected dat: DatActions,
    protected dataService: ReduxMainService
  ) {
    this.pkProject$ = this.ap.pkProject$;
    this.datNamespaces$ = this.aps.datNamespaces$
  }

  loadContentTree(pkProject: number, pkRoot: number): Observable<GvPositiveSchemaObject> {
    return this.reduxMain.loadContentTree(pkProject, pkRoot)
  }



  /**
   *
   * @param pkEntity pk of digital
   * @returns
   */
  loadDigital(pkEntity: number): Observable<SucceedActionMeta<DatDigital>> {
    return this.dat.digital.loadVersion(pkEntity).resolved$
  }

  /**
   *
   * @param pkEntity pk of expression portion
   * @returns
   */
  loadResource(pkEntity: number, pkProject: number) {
    return this.dataService.loadInfResource(pkEntity, pkProject)
  }

  upsertText(datDigital: DatDigital, pkNamespace: number, pkProject: number, pkParent: number, parentIsF2Expression: boolean) {
    this.dat.digital.upsert([datDigital], pkNamespace)
      .resolved$.subscribe(resolved => {

        if (resolved) {
          // resolved.items[0].pk_entity
          this.dataService.upsertInfStatementsWithRelations(
            pkProject,
            [{
              fk_subject_data: resolved.items[0].pk_entity,
              fk_object_info: pkParent,
              fk_property: DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF
            } as InfStatement]
          );

        }
      });
  }

  replaceStatement(pkProject: number, pkOldStatement: number, newStatement: InfStatement) {
    // remove old statement
    this.dataService.removeInfEntitiesFromProject([pkOldStatement], pkProject);

    // find or create a new statement bewteen the dragged and the new parent
    this.dataService.upsertInfStatementsWithRelations(pkProject, [newStatement]);
  }

  upsertInfStatementsWithRelations(pkProject: number, stmts: InfStatementWithRelations[]) {
    return this.dataService.upsertInfStatementsWithRelations(pkProject, stmts);
  }

  removeInfEntitiesFromProject(pkEntities: number[], pkProject: number) {
    return this.dataService.removeInfEntitiesFromProject(pkEntities, pkProject);
  }


  openText(node: ContentTreeNode) {
    this.aps.addEntityTabWithoutClass(node.statement.fk_subject_data)
  }

  openTable(node: ContentTreeNode) {
    this.aps.addEntityTabWithoutClass(node.statement.fk_subject_data)
  }

  openExpressionPortion(node: ContentTreeNode) {
    this.aps.addEntityTab(
      node.statement.fk_subject_info,
      DfhConfig.CLASS_PK_EXPRESSION_PORTION,
    )
  }


}
