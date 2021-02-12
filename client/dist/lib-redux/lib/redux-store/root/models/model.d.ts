import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { IAccount, Information, IProjectList, LoadingBar, ProjectDetail, SourceList } from '../../state-gui/models';
import { Dat, Dfh, Inf, Pro, Sys, Tab, War } from '../../state-schema/models';
export interface InfObject {
    persistent_item: InfPersistentItem[];
    temporal_entity: InfTemporalEntity[];
    statement: InfStatement[];
    place: InfPlace[];
    language: InfLanguage[];
    appellation: InfAppellation[];
    time_primitive: InfTimePrimitive[];
    text_property: InfTextProperty[];
    lang_string: InfLangString[];
    dimension: InfDimension[];
}
export interface ProObject {
    info_proj_rel: ProInfoProjRel[];
}
export interface DatObject {
    digital: DatDigital[];
}
export interface WarObject {
    entity_preview: WarEntityPreview[];
}
export interface SchemaObject {
    inf?: InfObject;
    pro?: ProObject;
    dat?: DatObject;
    war?: WarObject;
}
export interface PaginationObject {
    count: number;
    schemas: SchemaObject;
    statements: number[];
}
export interface IAppState {
    account?: IAccount;
    loadingBar?: LoadingBar;
    projects?: IProjectList;
    sys?: Sys;
    dfh?: Dfh;
    inf?: Inf;
    dat?: Dat;
    pro?: Pro;
    war?: War;
    tab?: Tab;
    activeProject?: ProjectDetail;
    routes?: any;
    information?: Information;
    sources?: SourceList;
    sandboxState?: any;
    pending?: ByPk<string>;
}
export interface ByPk<T> {
    [pk: string]: T;
}
