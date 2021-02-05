import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { Information } from 'app/modules/information/containers/entity-list/api/entity-list.models';
import { IAccount } from '../../modules/account/account.model';
// import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { Dat } from '../dat/dat.models';
import { Dfh } from '../dfh/dfh.models';
import { Inf } from '../inf/inf.models';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { Pro } from '../pro/pro.models';
import { DatDigital, InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProInfoProjRel, InfLangString, InfDimension } from '../sdk';
import { Sys } from '../sys/sys.models';
import { War } from '../war/war.models';
import { Tab } from '../tab/tab.models';
import { WarEntityPreview } from '../sdk-lb4';

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

