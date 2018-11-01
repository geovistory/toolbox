import { PropertyFieldList } from 'app/core/state/models';
import { ComClassFieldInterface, ComUiContextInterface, ProjectInterface } from 'app/core/sdk';
import { ClassSettingsI } from 'app/modules/projects/containers/class-settings/api/class-settings.models';


export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm,
    classSettings?: ClassSettingsI
}

export interface ProjectCrm {
    classes?: ClassConfigList;
    propertyFields?: PropertyFieldList;
}

export interface ClassConfigList { [dfh_pk_class: number]: ClassConfig };

export interface ClassConfig {
    label: string;
    dfh_identifier_in_namespace: string;
    dfh_pk_class: number;
    subclassOf?: 'peIt' | 'teEnt' ; // to distinguish TeEnts from PeIts
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
    propertyFieldKey?: string,
    propSetKey?: string,
    fk_class_field?: number,
    class_field?: ComClassFieldInterface
    ord_num: number
}
