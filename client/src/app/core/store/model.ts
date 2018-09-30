import { IAccount } from '../../modules/account/account.model';
import { Admin } from '../../modules/admin/admin.models';
import { Information } from '../../modules/information/information.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { ProjectDetail } from 'app/core/active-project/active-project.models';

export interface IAppState {
    account?: IAccount,
    admin?: Admin,
    loadingBar?: LoadingBar,
    projects?: IProjectList
    activeProject?: ProjectDetail
    routes?: any,
    information?: Information,
    sources?: ISourceListState
}
