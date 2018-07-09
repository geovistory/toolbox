import { DfhClassInterface, ProjectInterface } from 'app/core';

import { RoleSetList } from '../../modules/information2/information.models';
import { ComUiContextInterface, ComPropertySet } from '../sdk';

export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm
}

export interface ProjectCrm {
    [dfh_pk_class: number]: ClassConfig
}

export interface ClassConfig {
    label: string;
    dfh_identifier_in_namespace: string;
    dfh_pk_class: number;
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
    fk_property_set?: number,
    property_set?: ComPropertySet
    ord_num: number
}



var x: ProjectDetail = {
    crm: {
        21: {
            dfh_pk_class: 21,
            dfh_identifier_in_namespace: 'E51',
            label: 'Person',
            roleSets: {

            },
            uiContexts: {
                103: {
                    label: 'Editable',
                    uiElements: [
                        {
                            fk_property_set: 12,
                            ord_num: 0
                        },
                        {
                            fk_property: 113,
                            property_is_outgoing: true,
                            ord_num: 1
                        }
                    ]
                }
            }
        }
    }
}