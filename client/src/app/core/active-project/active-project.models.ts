import { RoleSetList } from 'app/core/models';
import { ComPropertySetInterface, ComUiContextInterface, ProjectInterface } from 'app/core/sdk';


export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm
}

export interface ProjectCrm {
    classes?: ClassConfigList;
    roleSets?: RoleSetList;
}

export interface ClassConfigList { [dfh_pk_class: number]: ClassConfig };

export interface ClassConfig {
    label: string;
    dfh_identifier_in_namespace: string;
    dfh_pk_class: number;
    dfh_fk_system_type: number; // to distinguish TeEnts from PeIts
    roleSets?: RoleSetList;
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
    roleSetKey?: string,
    propSetKey?: string,
    fk_property_set?: number,
    property_set?: ComPropertySetInterface
    ord_num: number
}