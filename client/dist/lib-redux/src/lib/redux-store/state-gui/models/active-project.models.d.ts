import { DatChunk, InfPersistentItem, InfTemporalEntity, ProDfhClassProjRel, SysAppContextInterface, SysClassFieldInterface } from '@kleiolab/lib-sdk-lb3';
import { DfhProperty, InfLanguage, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EntityDetail, ProjectSettingsData, TabBase, Types } from './active-project';
export interface ProjectPreview {
    label?: string;
    description?: string;
    default_language?: InfLanguage;
    pk_project?: number;
}
export interface EntityByPk<T> {
    [pk_entity: number]: T;
}
export interface VersionEntity<T> {
    _latestVersion: number;
    [v: number]: T;
}
export interface EntityVersionsByPk<T> {
    [pk_entity: number]: VersionEntity<T>;
}
export interface ChunkList {
    [pk_entity: number]: DatChunk;
}
export interface PeItList {
    [pk_entity: number]: InfPersistentItem;
}
export interface TeEnList {
    [pk_entity: number]: InfTemporalEntity;
}
export interface PropertyList {
    [pk_entity: string]: DfhProperty;
}
export interface TypePeIt extends InfPersistentItem {
    fk_typed_class: number;
}
export interface TypesByClass {
    [dfh_pk_class: string]: TypePeIt[];
}
export interface TypesByPk {
    [pk_entity: string]: TypePeIt;
}
export interface TypePreview extends WarEntityPreview {
    fk_typed_class: number;
}
export interface TypePreviewsByClass {
    [dfh_pk_class: string]: TypePreview[];
}
export interface TypePreviewList {
    [pk_entity: string]: TypePreview[];
}
export declare type IconType = 'text' | 'table' | 'persistent-entity' | 'temporal-entity' | 'source' | 'expression-portion' | 'analysis' | 'query' | 'visual' | 'story' | 'settings';
export interface Panel {
    id: number;
    tabs: PanelTab<any>[];
}
export declare type ListType = '' | 'entities' | 'sources' | 'analysis' | 'queries' | 'visuals' | 'stories' | 'settings';
export interface PanelTab<D> {
    active: boolean;
    component: 'text-detail' | 'table-detail' | 'entity-detail' | 'te-en-detail' | 'analysis-detail' | 'query-detail' | 'visual-detail' | 'ontome-profiles-settings' | 'classes-settings' | 'contr-vocab-settings';
    icon: IconType;
    pathSegment?: 'textDetails' | 'tableDetails' | 'peItDetails' | 'teEnDetails' | 'analysisDetails' | 'queryDetails' | 'visualDetails' | 'ontomeProfilesSettings' | 'classesSettings' | 'contrVocabSettings';
    data?: D;
    path?: string[];
    tabTitle$?: Observable<string>;
    loading$?: Observable<boolean>;
}
export interface PeItTabData {
    peItDetailConfig?: {
        peItDetail?: EntityDetail;
    };
}
export interface AnalysisTabData {
    pkEntity?: number;
    fkAnalysisType?: number;
}
export interface TabData {
    pkEntity?: number;
    pkProperty?: number;
    peItDetailConfig?: {
        peItDetail?: EntityDetail;
    };
}
export interface RamSource {
    pkEntity?: number;
    chunk?: DatChunk;
}
export interface ProjectDetail extends ProjectPreview {
    /******************************************************************
     * CRM and Project Config
     */
    loadingConfigData?: boolean;
    configDataInitialized?: boolean;
    /******************************************************************
     * Information Cache
     */
    /******************************************************************
     * Layout – Tabs
     */
    list?: ListType;
    panels?: Panel[];
    focusedPanel?: number;
    panelSerial?: number;
    uiIdSerial?: number;
    tabLayouts?: {
        [uiId: string]: TabBase;
    };
    textDetails?: {
        [uiId: string]: TabBase;
    };
    peItDetails?: {
        [uiId: string]: EntityDetail;
    };
    analysisDetails?: {
        [uiId: string]: any;
    };
    classesSettings?: {
        [uiId: string]: ProjectSettingsData;
    };
    contrVocabSettings?: {
        [uiId: string]: Types;
    };
    ontomeProfilesSettings?: {
        [uiId: string]: any;
    };
    /******************************************************************
     * Things for Mentionings / Annotations
     */
    refiningChunk?: boolean;
    creatingMentioning?: boolean;
    mentioningsFocusedInText?: number[];
    mentioningsFocusedInTable?: number[];
}
export interface ProjectCrm {
    classes?: ClassConfigList;
    properties?: PropertyList;
}
export interface ClassConfigList {
    [dfh_pk_class: number]: ClassConfig;
}
export interface ClassConfig {
    pkEntity: number;
    dfh_pk_class: number;
    label: string;
    dfh_standard_label: string;
    profileLabels: string;
    profilePks: number[];
    projRel?: ProDfhClassProjRel;
    isInProject?: boolean;
    changingProjRel: boolean;
    subclassOf?: 'peIt' | 'teEnt' | 'other';
    subclassOfType?: boolean;
    scopeNote: string;
    dfh_identifier_in_namespace: string;
    uiContexts?: {
        [pk: number]: UiContext;
    };
    required_by_sources?: boolean;
    required_by_entities?: boolean;
    required_by_basics?: boolean;
    excluded_from_entities?: boolean;
}
export interface UiContext extends SysAppContextInterface {
    uiElements?: UiElement[];
}
export interface UiElement {
    fk_property?: number;
    property_is_outgoing?: boolean;
    propertyFieldKey?: string;
    propSetKey?: string;
    fk_class_field?: number;
    class_field?: SysClassFieldInterface;
    ord_num: number;
}
