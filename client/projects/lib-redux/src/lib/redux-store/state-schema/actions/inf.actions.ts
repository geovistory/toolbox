
import { Injectable } from '@angular/core';
import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState, SchemaObject } from '../../root/models/model';
import { LoadActionMeta, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { InfResourceSlice } from '../models/inf.models';
import { infRoot } from '../reducer-configs/inf.config';



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

export interface LoadAlternativeTextProperties extends LoadActionMeta { fkEntity: number, fkClassField: number };




@Injectable({
  providedIn: 'root'
})
export class InfActions {

  statement: SchemaActionsFactory<InfStatement>;
  resource: SchemaActionsFactory<InfResource>;
  language: SchemaActionsFactory<InfLanguage>;
  appellation: SchemaActionsFactory<InfAppellation>;
  lang_string: SchemaActionsFactory<InfLangString>;
  dimension: SchemaActionsFactory<InfDimension>;
  place: SchemaActionsFactory<InfPlace>;
  time_primitive: SchemaActionsFactory<InfTimePrimitive>;

  constructor(
    public store: Store<IAppState>,
  ) {
    this.statement = new SchemaActionsFactory<InfStatement>(this.store, infRoot, 'statement')
    this.resource = new SchemaActionsFactory<InfResource>(this.store, infRoot, 'resource')
    this.language = new SchemaActionsFactory<InfLanguage>(this.store, infRoot, 'language')
    this.appellation = new SchemaActionsFactory<InfAppellation>(this.store, infRoot, 'appellation')
    this.lang_string = new SchemaActionsFactory<InfLangString>(this.store, infRoot, 'lang_string')
    this.dimension = new SchemaActionsFactory<InfDimension>(this.store, infRoot, 'dimension')
    this.place = new SchemaActionsFactory<InfPlace>(this.store, infRoot, 'place')
    this.time_primitive = new SchemaActionsFactory<InfTimePrimitive>(this.store, infRoot, 'time_primitive')
  }



}
