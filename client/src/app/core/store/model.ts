import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { EntityDetail } from 'app/modules/information/containers/entity-detail/api/entity-detail.models';
import { Information } from 'app/modules/information/containers/information/api/information.models';
import { IAccount } from '../../modules/account/account.model';
import { Backoffice } from '../../modules/backoffice/backoffice.models';
import { IProjectList } from '../../modules/projects/projects.model';
import { ISourceListState } from '../../modules/sources';
import { LoadingBar } from '../loading-bar/loading-bar.models';
import { SourceDetail } from 'app/modules/sources/containers/source-detail/api/source-detail.models';

export interface IAppState {
    account?: IAccount,
    backoffice?: Backoffice,
    loadingBar?: LoadingBar,
    projects?: IProjectList
    activeProject?: ProjectDetail
    routes?: any,
    information?: Information,
    entityDetail?: EntityDetail
    sources?: ISourceListState,
    sourceDetail?: SourceDetail
    sandboxState?: any
}
