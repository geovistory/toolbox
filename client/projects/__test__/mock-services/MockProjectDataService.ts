import { GvPositiveSchemaObject, GvSchemaModifier, InfResource, InfStatementWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ReplaceStatementInFieldRequest } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/replaceStatementInFieldRequest';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
export class MockProjectDataService {
  constructor(private infResources: InfResource[]) { }

  public findProjectDataControllerGetResource(pkProject: number, pkEntity: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<GvPositiveSchemaObject> {
    if (pkProject) {
      return of({
        inf: {
          resource: [
            this.infResources.find(i => i.pk_entity === pkEntity)
          ]
        },
        pro: {
          info_proj_rel: [
            {
              pk_entity: 123 * pkEntity,
              fk_project: pkProject,
              fk_entity: pkEntity,
              is_in_project: true
            }
          ]
        }
      })
    }
  }

  public createProjectDataControllerUpsertStatements(pkProject?: number, infStatementWithRelations?: Array<InfStatementWithRelations>): Observable<GvSchemaModifier> {
    return of({}).pipe(map(() => { throw new Error("") }))
  }
  public createProjectDataControllerReplaceStatementsOfField(req: ReplaceStatementInFieldRequest): Observable<void> {
    return of({}).pipe(map(() => { throw new Error("") }))
  }


}
