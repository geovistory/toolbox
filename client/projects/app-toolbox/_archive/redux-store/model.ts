import { ProjectDetail } from "@kleiolab/lib-redux";
import { Information } from 'projects/app-toolbox/src/app/modules/information/containers/entity-list/api/entity-list.models';
import { IAccount } from '../../modules/account/account.model';
// import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { Dat } from "@kleiolab/lib-redux";
import { Dfh } from "@kleiolab/lib-redux";
import { Inf } from "@kleiolab/lib-redux";
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { Pro } from "@kleiolab/lib-redux";
import { DatDigital, InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProInfoProjRel, InfLangString, InfDimension } from '@kleiolab/lib-sdk-lb3';
import { Sys } from "@kleiolab/lib-redux";
import { War } from "@kleiolab/lib-redux";
import { Tab } from "@kleiolab/lib-redux";
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

export interface InfObject {
  persistent_item: InfPersistentItem[]
  temporal_entity: InfTemporalEntity[]
  statement: InfStatement[]
  place: InfPlace[]
  language: InfLanguage[]
  appellation: InfAppellation[]
  time_primitive: InfTimePrimitive[]
  text_property: InfTextProperty[]
  lang_string: InfLangString[]
  dimension: InfDimension[]
}
export interface ProObject {
  info_proj_rel: ProInfoProjRel[]
}
export interface DatObject {
  digital: DatDigital[]
}

export interface WarObject {
  entity_preview: WarEntityPreview[]
}

export interface SchemaObject {
  inf?: InfObject
  pro?: ProObject
  dat?: DatObject
  war?: WarObject
}

export interface PaginationObject {
  count: number
  schemas: SchemaObject
  statements: number[]
}

export interface IAppState {
  account?: IAccount,
  // backoffice?: Backoffice,
  loadingBar?: LoadingBar,
  projects?: IProjectList
  sys?: Sys
  dfh?: Dfh
  inf?: Inf
  dat?: Dat
  pro?: Pro
  war?: War
  tab?: Tab
  activeProject?: ProjectDetail
  routes?: any,
  information?: Information,
  sources?: ISourceListState,
  sandboxState?: any,
  pending?: ByPk<string>
}

// generic interfaces used by different store modules
export interface ByPk<T> {
  [pk: string]: T
}

