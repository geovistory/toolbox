import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { Information } from 'app/modules/information/containers/entity-list/api/entity-list.models';
import { IAccount } from '../../modules/account/account.model';
import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { Dat } from '../dat/dat.models';
import { Dfh } from '../dfh/dfh.models';
import { Inf } from '../inf/inf.models';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { Pro } from '../pro/pro.models';
import { InfAppellation, InfEntityAssociation, InfPersistentItem, InfPlace, InfRole, InfTemporalEntity, InfTimePrimitive, InfTextProperty, InfLanguage, ProInfoProjRel } from '../sdk';
import { Sys } from '../sys/sys.models';

export interface InfObject {
  persistent_item: InfPersistentItem[]
  temporal_entity: InfTemporalEntity[]
  role: InfRole[]
  entity_association: InfEntityAssociation[]
  place: InfPlace[]
  language: InfLanguage[]
  appellation: InfAppellation[]
  time_primitive: InfTimePrimitive[]
  text_property: InfTextProperty[]
}
export interface ProObject {
  info_proj_rel: ProInfoProjRel[]
}

export interface SchemaObject {
  inf?: InfObject
  pro?: ProObject
}

export interface IAppState {
  account?: IAccount,
  backoffice?: Backoffice,
  loadingBar?: LoadingBar,
  projects?: IProjectList
  sys?: Sys
  dfh?: Dfh
  inf?: Inf
  dat?: Dat
  pro?: Pro
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

