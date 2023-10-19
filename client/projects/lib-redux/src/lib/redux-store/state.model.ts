import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { DataState } from './data/data.model';
import { SucceedActionMeta } from './data/_lib/crud-actions-factory';
import { LoadingBarState } from './ui/loadingbar/loading-bar.models';
import { IAccount } from './ui/models/account.model';
import { ProjectDetail } from './ui/models/active-project.models';


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
  account?: IAccount,
  // backoffice?: Backoffice,
  loadingBar?: LoadingBarState,
  data?: DataState
  activeProject?: ProjectDetail
  pending?: ByPk<boolean>
  resolved?: ByPk<SucceedActionMeta<any>>
}

// generic interfaces used by different store modules
export interface ByPk<T> {
  [pk: string]: T
}

