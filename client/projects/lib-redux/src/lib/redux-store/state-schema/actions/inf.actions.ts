
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { DatDigital, GvPositiveSchemaObject, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { IAppState, SchemaObject } from '../../root/models/model';
import { InfDimensionSlice, InfResourceSlice } from '../models/inf.models';
import { infRoot } from '../reducer-configs/inf.config';
import { LoadActionMeta, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { GvSchemaActions } from './schema.actions';



type Payload = InfResourceSlice;

export interface LoadByPkMeta extends LoadActionMeta { pkEntity: number };
export type LoadTypesOfProjectAction = LoadActionMeta;
export interface LoadTypeOfProjectAction extends LoadActionMeta { pkEntity: number };
type LoadNestetedPeItResult = InfResource[]


export type PaginatedStatements = number[]
export interface PaginatedStatementList {
  count: number,
  schemas: SchemaObject,
  paginatedStatements: PaginatedStatements
}
export interface LoadPaginatedStatementListMeta extends LoadActionMeta {
  pkSourceEntity: number // Pk of the source entity.
  pkProperty: number // Pk of the property.
  fkTargetClass: number // Pk of the target class.
  isOutgoing: boolean // If true, the source entity is domain, else range.
  limit: number // number of items per page.
  offset: number // offset.
  alternatives: boolean
}


export interface FindStatementByParams extends LoadActionMeta {
  ofProject: boolean,
  pkEntity: number,
  pkInfoRange: number,
  pkInfoDomain: number,
  pkProperty: number,
}
export interface ContentTreeMeta extends LoadActionMeta {
  pkExpressionEntity: number,
}
export interface SourcesAndDigitalsOfEntity extends LoadActionMeta {
  ofProject: boolean,
  pkEntity: number,
}
export interface SourcesAndDigitalsOfEntityResult {
  statements: InfStatement[],
  digitals: DatDigital[],
}


export interface LoadOutgoingAlternativeStatements extends LoadActionMeta { pkTemporalEntity: number, pkProperty: number };
export interface LoadIngoingAlternativeStatements extends LoadActionMeta { pkEntity: number, pkProperty: number };
export interface AddToProjectWithTeEntActionMeta { pkStatements: number[], pk: number, addPending: string };

// export class InfStatementActionFactory extends InfActionFactory<Payload, InfStatement> {

//   // Suffixes of load action types
//   static readonly CONTENT_TREE = 'CONTENT_TREE';
//   static readonly SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
//   static readonly BY_PARAMS = 'BY_PARAMS';

//   sourcesAndDigitalsOfEntity: (ofProject: boolean, pkProject: number, pkEntity: number) => ActionResultObservable<SourcesAndDigitalsOfEntityResult>;
//   findByParams: (
//     ofProject: boolean,
//     pkProject: number,
//     pkEntity: number,
//     pkInfoRange: number,
//     pkInfoDomain: number,
//     pkProperty: number,
//   ) => void;

//   constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

//   createActions(): InfStatementActionFactory {
//     Object.assign(this, this.createInfActions(infRoot, 'statement'))

//     this.findByParams = (
//       ofProject: boolean,
//       pkProject: number,
//       pkEntity: number,
//       pkInfoRange: number,
//       pkInfoDomain: number,
//       pkProperty: number,
//     ) => {
//       const action: FluxStandardAction<Payload, FindStatementByParams> = {
//         type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
//         meta: {
//           addPending: U.uuid(),
//           pk: pkProject,
//           ofProject,
//           pkEntity,
//           pkInfoRange,
//           pkInfoDomain,
//           pkProperty,
//         },
//         payload: null,
//       };
//       this.ngRedux.dispatch(action)
//     }


//     // this.loadIngoingAlternatives = (pkEntity: number, pkProperty: number, pkProject: number) => {
//     //   const addPending = U.uuid()
//     //   const action: FluxStandardAction<Payload, LoadIngoingAlternativeStatements> = {
//     //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
//     //     meta: {
//     //       addPending,
//     //       pk: pkProject,
//     //       pkEntity,
//     //       pkProperty,
//     //     },
//     //     payload: null,
//     //   };
//     //   this.ngRedux.dispatch(action)
//     //   return {
//     //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
//     //     resolved$: this.ngRedux.select<SucceedActionMeta<InfStatement>>(['resolved', addPending]).pipe(filter(x => !!x)),
//     //     key: addPending
//     //   };
//     // }


//     // this.loadPaginatedList = (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => {
//     //   const addPending = U.uuid()
//     //   const action: FluxStandardAction<Payload, LoadPaginatedStatementListMeta> = {
//     //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
//     //     meta: {
//     //       addPending,
//     //       pk: pkProject,
//     //       pkSourceEntity,
//     //       fkTargetClass,
//     //       pkProperty,
//     //       isOutgoing,
//     //       limit,
//     //       offset,
//     //       alternatives: false
//     //     },
//     //     payload: null,
//     //   };
//     //   this.ngRedux.dispatch(action)
//     //   return {
//     //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
//     //     resolved$: this.ngRedux.select<SucceedActionMeta<PaginatedStatementList>>(['resolved', addPending]).pipe(filter(x => !!x)),
//     //     key: addPending
//     //   };
//     // }


//     /**
//     * Get an nested object with everything needed to display the
//     * links made from an entity towards sources and digitals.
//     */
//     this.sourcesAndDigitalsOfEntity = (ofProject: boolean, pkProject: number, pkEntity: number) => {
//       const addPending = U.uuid()
//       const action: FluxStandardAction<Payload, SourcesAndDigitalsOfEntity> = {
//         type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
//         meta: {
//           addPending,
//           ofProject,
//           pk: pkProject,
//           pkEntity
//         },
//         payload: null,
//       };
//       this.ngRedux.dispatch(action)
//       return {
//         pending$: this.ngRedux.select<boolean>(['pending', addPending]),
//         resolved$: this.ngRedux.select<SucceedActionMeta<SourcesAndDigitalsOfEntityResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
//         key: addPending
//       };
//     }

//     return this;
//   }
// }

export interface LoadAlternativeTextProperties extends LoadActionMeta { fkEntity: number, fkClassField: number };




@Injectable({
  providedIn: 'root'
})
export class InfActions {


  // statement = new InfStatementActionFactory(this.ngRedux).createActions()

  statement = new SchemaActionsFactory<Payload, InfStatement>(this.ngRedux).createCrudActions(infRoot, 'statement')
  resource = new SchemaActionsFactory<Payload, InfResource>(this.ngRedux).createCrudActions(infRoot, 'resource')

  language = new SchemaActionsFactory<Payload, InfLanguage>(this.ngRedux).createCrudActions(infRoot, 'language')
  appellation = new SchemaActionsFactory<Payload, InfAppellation>(this.ngRedux).createCrudActions(infRoot, 'appellation')
  lang_string = new SchemaActionsFactory<Payload, InfLangString>(this.ngRedux).createCrudActions(infRoot, 'lang_string')
  dimension = new SchemaActionsFactory<InfDimensionSlice, InfDimension>(this.ngRedux).createCrudActions(infRoot, 'dimension')
  place = new SchemaActionsFactory<Payload, InfPlace>(this.ngRedux).createCrudActions(infRoot, 'place')
  time_primitive = new SchemaActionsFactory<Payload, InfTimePrimitive>(this.ngRedux).createCrudActions(infRoot, 'time_primitive')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    private schemaActions: GvSchemaActions,
    private proInfoProjRelApi: ProInfoProjRelApi
  ) { }

  removeEntitiesFromProject(pkEntities: number[], pkProject: number): Observable<GvPositiveSchemaObject> {
    return this.schemaActions.loadGvSchemaObject(this.proInfoProjRelApi.bulkUpdateEprAttributes(
      pkProject,
      pkEntities.map((pk) => ({
        fk_entity: pk,
        is_in_project: false
      }))
    ))
  }

}
