import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { DataState } from './data/data.model';
import { SucceedActionMeta } from './data/_lib/crud-actions-factory';
import { AccountState } from './ui/account/account.model';
import { ActiveProjectState } from './ui/activeProject/active-project.models';
import { LoadingBarState } from './ui/loadingBar/loading-bar.models';


export interface InfObject {
  resource?: InfResource[]
  statement?: InfStatement[]
  place?: InfPlace[]
  language?: InfLanguage[]
  appellation?: InfAppellation[]
  time_primitive?: InfTimePrimitive[]
  lang_string?: InfLangString[]
  dimension?: InfDimension[]
}
export interface ProObject {
  info_proj_rel?: ProInfoProjRel[]
  project?: ProProject[]
}
export interface DatObject {
  digital?: DatDigital[]
}

export interface WarObject {
  entity_preview?: WarEntityPreview[]
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
  account?: AccountState,
  // backoffice?: Backoffice,
  loadingBar?: LoadingBarState,
  data?: DataState
  activeProject?: ActiveProjectState
  pending?: ByPk<boolean>
  resolved?: ByPk<SucceedActionMeta<any>>
}

// generic interfaces used by different store modules
export interface ByPk<T> {
  [pk: string]: T
}

