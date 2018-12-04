import { PropertyFieldList, FieldList, DataUnitPreviewList, PeItDetailList } from 'app/core/state/models';
import { ComClassFieldInterface, ComUiContextInterface, ProjectInterface, InfChunk } from 'app/core/sdk';
import { ClassSettingsI } from 'app/modules/projects/containers/class-settings/api/class-settings.models';

export interface ChunkList { [pk_entity: number]: InfChunk };


export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm,
    classSettings?: ClassSettingsI

    /******************************************************************
     * Data Cache
     */

    // data unit previews
    dataUnitPreviews?: DataUnitPreviewList;

    // data unit details for display in modal
    peItModals?: PeItDetailList;

    // chunk List
    chunks?: ChunkList;


    /******************************************************************
     * Things for Mentionings / Annotations
     */

    // the chunk that is used to create mentionings
    selectedChunk?: InfChunk;
    // if true, the text editor behaves so that each node can be clicked to de-/activate
    refiningChunk?: boolean;
    // true, when mentioning is being created.
    // TODO: check, if needed
    creatingMentioning?: boolean;

    // Array of pk_entities of mentionings (a.k.a. entity_associations of property "is mentioned in")
    // that are focused by a click on a chunk (in text editor)
    mentioningsFocusedInText?: number[]

    // Array of pk_entities of mentionings (a.k.a. entity_associations of property "is mentioned in")
    // that are focused by click on mentioning in a list/table view
    mentioningsFocusedInTable?: number[]

}

export interface ProjectCrm {
    classes?: ClassConfigList;
    fieldList?: FieldList;

}

export interface ClassConfigList { [dfh_pk_class: number]: ClassConfig };

export interface ClassConfig {
    label: string;
    dfh_identifier_in_namespace: string;
    dfh_pk_class: number;
    subclassOf?: 'peIt' | 'teEnt'; // to distinguish TeEnts from PeIts
    isInProject?: boolean; // reflects the enabled / disabled state from data settings of the project
    propertyFields?: PropertyFieldList;
    uiContexts?: {
        [pk: number]: UiContext
    }
}

export interface UiContext extends ComUiContextInterface {
    uiElements?: UiElement[]
}

// short version of ComUiContextConfig
export interface UiElement {
    fk_property?: number,
    property_is_outgoing?: boolean,
    propertyFieldKey?: string, // TODO: merge the propertyFieldKey and propSetKey to fieldKey
    propSetKey?: string,
    fk_class_field?: number,
    class_field?: ComClassFieldInterface
    ord_num: number
}
