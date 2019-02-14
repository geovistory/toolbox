import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { Information } from 'app/modules/information/containers/information/api/information.models';
import { IAccount } from '../../modules/account/account.model';
import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { QueryList } from 'app/modules/queries/containers/query-list/api/query-list.models';

export interface IAppState {
    account?: IAccount,
    backoffice?: Backoffice,
    loadingBar?: LoadingBar,
    projects?: IProjectList
    activeProject?: ProjectDetail
    routes?: any,
    information?: Information,
    sources?: ISourceListState,
    queries?: QueryList,
    sandboxState?: any
}
