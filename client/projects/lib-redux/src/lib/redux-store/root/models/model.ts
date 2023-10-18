import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { LoadingBarState } from '../../state-gui/loadingbar/loading-bar.models';
import { IAccount } from '../../state-gui/models/account.model';
import { ProjectDetail } from '../../state-gui/models/active-project.models';
import { Information } from '../../state-gui/models/entity-list.models';
import { SourceList } from '../../state-gui/models/source-list.models';
import { DatState } from '../../state-schema/dat/dat.models';
import { DfhState } from '../../state-schema/dfh/dfh.models';
import { InfState } from "../../state-schema/inf/inf.models";
import { ProState } from '../../state-schema/pro/pro.models';
import { SysState } from '../../state-schema/sys/sys.models';
import { TabState } from '../../state-schema/tab/tab.models';
import { WarState } from '../../state-schema/war/war.models';
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
  sys?: SysState
  dfh?: DfhState
  inf?: InfState
  dat?: DatState
  pro?: ProState
  war?: WarState
  tab?: TabState
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

