import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { LoadingBarState } from '../../state-gui/loadingbar/loading-bar.models';
import { IAccount } from '../../state-gui/models/account.model';
import { ProjectDetail } from '../../state-gui/models/active-project.models';
import { Information } from '../../state-gui/models/entity-list.models';
import { SourceList } from '../../state-gui/models/source-list.models';
import { InfState } from "../../state-schema/inf/inf.models";
import { Dat } from '../../state-schema/models/dat.models';
import { Dfh } from '../../state-schema/models/dfh.models';
import { Sys } from '../../state-schema/models/sys.models';
import { Tab } from '../../state-schema/models/tab.models';
import { War } from '../../state-schema/models/war.models';
import { ProState } from '../../state-schema/pro/pro.models';
import { SucceedActionMeta } from '../../state-schema/_helpers/schema-actions-factory';


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
  sys?: Sys
  dfh?: Dfh
  inf?: InfState
  dat?: Dat
  pro?: ProState
  war?: War
  tab?: Tab
  activeProject?: ProjectDetail
  routes?: any,
  information?: Information,
  sources?: SourceList,
  sandboxState?: any,
  pending?: ByPk<boolean>
  resolved?: ByPk<SucceedActionMeta<any>>
}

// generic interfaces used by different store modules
export interface ByPk<T> {
  [pk: string]: T
}

