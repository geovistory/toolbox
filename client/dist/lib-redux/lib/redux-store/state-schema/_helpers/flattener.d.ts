import { DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { ChunkSlice, DigitalSlice } from '../models/dat.models';
import { InfAppellationSlice, InfDimensionSlice, InfLangStringSlice, InfLanguageSlice, InfPersistentItemSlice, InfPlaceSlice, InfTextPropertySlice, InfTimePrimitiveSlice } from '../models/inf.models';
import { ProAnalysisSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProDfhProfileProjRelSlice, ProInfoProjRelSlice, ProProjectSlice, ProTextPropertySlice } from '../models/pro.models';
import { SchemaActionsFactory } from './schema-actions-factory';
declare class ModelFlattener<Payload, Model> {
    actions: SchemaActionsFactory<Payload, Model>;
    modelDefinition: any;
    flattenCb: (items: Model[]) => void;
    items: Model[];
    constructor(actions: SchemaActionsFactory<Payload, Model>, modelDefinition: any, flattenCb: (items: Model[]) => void);
    flatten(items: Model[]): boolean;
}
interface FlattenerInterface {
    [key: string]: ModelFlattener<any, any>;
}
/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
export declare class Flattener {
    infActions: InfActions;
    datActions: DatActions;
    proActions: ProActions;
    info_proj_rel: ModelFlattener<ProInfoProjRelSlice, ProInfoProjRel>;
    pro_dfh_class_proj_rel: ModelFlattener<ProDfhClassProjRelSlice, ProDfhClassProjRel>;
    pro_dfh_profile_proj_rel: ModelFlattener<ProDfhProfileProjRelSlice, ProDfhProfileProjRel>;
    persistent_item: ModelFlattener<InfPersistentItemSlice, InfPersistentItem>;
    temporal_entity: ModelFlattener<InfPersistentItemSlice, InfTemporalEntity>;
    statement: ModelFlattener<InfPersistentItemSlice, InfStatement>;
    appellation: ModelFlattener<InfAppellationSlice, InfAppellation>;
    place: ModelFlattener<InfPlaceSlice, InfPlace>;
    time_primitive: ModelFlattener<InfTimePrimitiveSlice, InfTimePrimitive>;
    language: ModelFlattener<InfLanguageSlice, InfLanguage>;
    lang_string: ModelFlattener<InfLangStringSlice, InfLangString>;
    dimension: ModelFlattener<InfDimensionSlice, InfDimension>;
    text_property: ModelFlattener<InfTextPropertySlice, InfTextProperty>;
    digital: ModelFlattener<DigitalSlice, DatDigital>;
    chunk: ModelFlattener<ChunkSlice, DatChunk>;
    pro_project: ModelFlattener<ProProjectSlice, ProProject>;
    pro_text_property: ModelFlattener<ProTextPropertySlice, ProTextProperty>;
    pro_class_field_config: ModelFlattener<ProClassFieldConfigSlice, ProClassFieldConfig>;
    analysis: ModelFlattener<ProAnalysisSlice, ProAnalysis>;
    constructor(infActions: InfActions, datActions: DatActions, proActions: ProActions);
    getFlattened(): FlattenerInterface;
}
export declare const storeFlattened: (flattened: FlattenerInterface, pk?: any, type?: "LOAD" | "UPSERT") => void;
export {};
