import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { DatActions, GvSchemaActions, ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier, InfResource, InfStatement, InfStatementWithRelations, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { createStatementWithTarget } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { DatDigitalMock } from 'projects/__test__/data/auto-gen/gvDB/DatDigitalMock';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { InfStatementMock } from 'projects/__test__/data/auto-gen/gvDB/InfStatementMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { PubAccountMock } from 'projects/__test__/data/auto-gen/gvDB/PubAccountMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InformationModule } from '../../information.module';
import { ContentTreeComponent } from './content-tree.component';

const delayMs = () => Math.random() * 1000;

const infResources: InfResource[] = []
const warEntityPreviews: WarEntityPreview[] = [
  WarEntityPreviewMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1,
  WarEntityPreviewMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_2
]
const infStatements: InfStatement[] = [
  InfStatementMock.DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP,
  InfStatementMock.EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR,
  InfStatementMock.EXPR_PORTION_CHAPTER_2_IS_PART_OF_EXPR_PORTION_CHAPTER_1,
]
const proInfoProjRels: ProInfoProjRel[] = [
  ProInfoProjRelMock.PROJ_1_STMT_DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP,
  ProInfoProjRelMock.PROJ_1_STMT_EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR,
  ProInfoProjRelMock.PROJ_1_STMT_EXPR_PORTION_CHAPTER_2_IS_PART_OF_EXPR_PORTION_CHAPTER_1,
]

for (let i = 0; i < 50; i++) {
  const expressionPortionResource: InfResource = {
    pk_entity: 12000 + i,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  }
  infResources.push(expressionPortionResource)

  const projRelResource: ProInfoProjRel = {
    pk_entity: 14000 + i,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: expressionPortionResource.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  }
  proInfoProjRels.push(projRelResource)
  const expressionPortionEntPreview: WarEntityPreview = {
    ...expressionPortionResource,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    project: ProProjectMock.PROJECT_1.pk_entity,
    class_label: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_class_label,
    entity_label: 'Chapter ' + i,
    entity_type: 'peIt',
  }
  warEntityPreviews.push(expressionPortionEntPreview)
  const expressionToExpressionPortion: InfStatement = {
    pk_entity: 13000 + i,

    fk_subject_info: expressionPortionResource.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1317_IS_PART_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  }
  infStatements.push(expressionToExpressionPortion)
  const projRelStmt: ProInfoProjRel = {
    pk_entity: 14000 + i,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: expressionToExpressionPortion.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  }
  proInfoProjRels.push(projRelStmt)

}


const contentTreeMock: GvPositiveSchemaObject = {
  dat: {
    digital: [
      { ...DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO, string: 'Rudolf Foo' }
    ]
  },
  inf: {
    statement: infStatements
  },
  pro: {
    info_proj_rel: proInfoProjRels
  }
}
@Injectable()
export class ReduxMainServiceMock {
  static pkStatement = 100000
  constructor(
    private schemaActions: GvSchemaActions,
  ) {

  }
  loadFieldPage(req: GvFieldPageReq): Observable<GvPaginationObject> {
    let o: Observable<GvPaginationObject>
    if (req.page.property === InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY.fk_property) {

      const pageToExpression: GvPaginationObject = {
        subfieldPages: [
          {
            count: 1,
            req,
            paginatedStatements: [
              createStatementWithTarget(
                InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY,
                undefined,
                { entity: { resource: InfResourceMock.HABS_EMP_EXPR, entityPreview: WarEntityPreviewMock.HABS_EMP_EXPR } },
                req.page.isOutgoing,
                ProInfoProjRelMock.PROJ_1_STMT_HABS_EMP_CARRIERS_PROVIDED_BY,
              )
            ]
          }
        ]
      }
      o = of(pageToExpression)
    } else {
      const pageToExpression: GvPaginationObject = {
        subfieldPages: [
          {
            count: 0,
            req,
            paginatedStatements: []
          }
        ]
      }
      o = of(pageToExpression)
    }

    return this.schemaActions.loadGvPaginationObject(o.pipe(delay(delayMs())))
  }

  loadInfResource(pkResource: number, pkProject: number): Observable<GvPositiveSchemaObject> {

    throw new Error('not yet implemented');
  }

  loadContentTree(pkProject: number, pkTreeRootEntity: number): Observable<GvPositiveSchemaObject> {
    return this.schemaActions.loadGvSchemaObject(of(contentTreeMock))
  }
  upsertInfStatementsWithRelations(pkProject: number, infStatementWithRelations: InfStatementWithRelations[])
    : Observable<GvSchemaModifier> {

    if (!ReduxMainServiceMock.pkStatement) { }

    const infStatements: InfStatement[] = infStatementWithRelations.map(s => ({
      pk_entity: ReduxMainServiceMock.pkStatement++,
      fk_subject_info: 0,
      fk_subject_data: 0,
      fk_subject_tables_cell: 0,
      fk_subject_tables_row: 0,
      fk_property: 0,
      fk_property_of_property: 0,
      fk_object_info: 0,
      fk_object_data: 0,
      fk_object_tables_cell: 0,
      fk_object_tables_row: 0,
      is_in_project_count: 0,
      is_standard_in_project_count: 0,
      ...s
    }))

    const infoProjRels: ProInfoProjRel[] = infStatements.map(s => ({
      fk_project: pkProject,
      fk_entity: s.pk_entity,
      is_in_project: true,
      fk_last_modifier: -1
    }))


    return this.schemaActions.loadGvSchemaModifier(of({
      positive: {
        inf: { statement: infStatements },
        pro: { info_proj_rel: infoProjRels }
      }
    }).pipe(delay(delayMs())))
  }

  removeInfEntitiesFromProject(pkEntities: number[], pkProject: number): Observable<GvPositiveSchemaObject> {
    const infoProjRels: ProInfoProjRel[] = pkEntities.map((pk) => ({
      fk_last_modifier: -1,
      fk_project: pkProject,
      fk_entity: pk,
      is_in_project: false
    }))

    return this.schemaActions.loadGvSchemaObject(of({ pro: { info_proj_rel: infoProjRels } }).pipe(delay(delayMs())))
  }

}


@Injectable()
export class DatActionsMock {
  digital = {
    loadVersion: (pkEntity: number) => {
      this.schemaActions.loadGvSchemaObject(of({
        dat: { digital: [DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO] }
      }))
    },
    upsert() {
      throw new Error('not yet implemente');
    }
  }
  constructor(
    private schemaActions: GvSchemaActions,
  ) { }
}

@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(delayMs()))
  }

}

@Injectable()
export class ActiveProjectServiceMock extends ActiveProjectService {

  addTextTab(pkEntity: number) {
    alert('Open Text (not possible in sandbox)')
  }

  addTableTab(pkEntity: number) {
    alert('Open Table (not possible in sandbox)')
  }

  addEntityTab(pkEntity: number, fkClass: number) {
    alert('Open Section (not possible in sandbox)')
  }

}

export default sandboxOf(ContentTreeComponent, {
  declareComponent: false,
  imports: [
    InformationModule,
    InitStateModule
  ],
  providers: [
    { provide: ReduxMainService, useClass: ReduxMainServiceMock },
    { provide: DatActions, useClass: DatActionsMock },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: ActiveProjectService, useClass: ActiveProjectServiceMock },
  ],
})
  .add('ContentTreeComponent', {
    context: {
      initState: IAppStateMock.stateProject1,
      pkEntity$: new BehaviorSubject(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity),
      fkClass$: new BehaviorSubject(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.fk_class),
    },
    template: `
    <gv-init-state [initState]="initState"></gv-init-state>

    <gv-content-tree [pkEntity$]="pkEntity$" [fkClass$]="fkClass$">Hey playground!</gv-content-tree>`
  });
