import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { Information } from 'app/modules/information/containers/entity-list/api/entity-list.models';
import { IAccount } from '../../modules/account/account.model';
import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { Sys } from '../sys/sys.models';
import { Dfh } from '../dfh/dfh.models';
import { Inf } from '../inf/inf.models';
import { Dat } from '../dat/dat.models';

export interface IAppState {
  account?: IAccount,
  backoffice?: Backoffice,
  loadingBar?: LoadingBar,
  projects?: IProjectList
  system?: Sys
  dfh?: Dfh
  inf?: Inf
  dat?: Dat
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

