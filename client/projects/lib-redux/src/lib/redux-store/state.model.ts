import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { DataState } from './data/data.model';
import { SucceedActionMeta } from './data/_lib/crud-actions-factory';
import { UiState } from './ui/ui.models';
import { ByPk } from './_lib/ByPk';


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
  data?: DataState
  ui?: UiState

  pending?: ByPk<boolean>
  resolved?: ByPk<SucceedActionMeta<any>>
}


