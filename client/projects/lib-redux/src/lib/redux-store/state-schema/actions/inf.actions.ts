
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { IAppState, SchemaObject } from '../../root/models/model';
import { InfResourceSlice } from '../models/inf.models';
import { infRoot } from '../reducer-configs/inf.config';
import { LoadActionMeta, SchemaActionsFactory } from '../_helpers/schema-actions-factory';



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

  statement = new SchemaActionsFactory<InfStatement>(this.ngRedux, infRoot, 'statement')
  resource = new SchemaActionsFactory<InfResource>(this.ngRedux, infRoot, 'resource')

  language = new SchemaActionsFactory<InfLanguage>(this.ngRedux, infRoot, 'language')
  appellation = new SchemaActionsFactory<InfAppellation>(this.ngRedux, infRoot, 'appellation')
  lang_string = new SchemaActionsFactory<InfLangString>(this.ngRedux, infRoot, 'lang_string')
  dimension = new SchemaActionsFactory<InfDimension>(this.ngRedux, infRoot, 'dimension')
  place = new SchemaActionsFactory<InfPlace>(this.ngRedux, infRoot, 'place')
  time_primitive = new SchemaActionsFactory<InfTimePrimitive>(this.ngRedux, infRoot, 'time_primitive')

  constructor(
    public ngRedux: NgRedux<IAppState>,
  ) { }



}
