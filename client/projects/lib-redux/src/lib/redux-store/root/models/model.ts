import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProInfoProjRel, ProProject } from '@kleiolab/lib-sdk-lb3';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IAccount } from '../../state-gui/models/account.model';
import { ProjectDetail } from '../../state-gui/models/active-project.models';
import { Information } from '../../state-gui/models/entity-list.models';
import { LoadingBar } from '../../state-gui/models/loading-bar.models';
import { IProjectList } from '../../state-gui/models/projects.model';
import { SourceList } from '../../state-gui/models/source-list.models';
import { Dat } from '../../state-schema/models/dat.models';
import { Dfh } from '../../state-schema/models/dfh.models';
import { Inf } from '../../state-schema/models/inf.models';
import { Pro } from '../../state-schema/models/pro.models';
import { Sys } from '../../state-schema/models/sys.models';
import { Tab } from '../../state-schema/models/tab.models';
import { War } from '../../state-schema/models/war.models';


export interface InfObject {
  persistent_item?: InfPersistentItem[]
  temporal_entity?: InfTemporalEntity[]
  statement?: InfStatement[]
  place?: InfPlace[]
  language?: InfLanguage[]
  appellation?: InfAppellation[]
  time_primitive?: InfTimePrimitive[]
  text_property?: InfTextProperty[]
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
  sources?: SourceList,
  sandboxState?: any,
  pending?: ByPk<string>
}

// generic interfaces used by different store modules
export interface ByPk<T> {
  [pk: string]: T
}

