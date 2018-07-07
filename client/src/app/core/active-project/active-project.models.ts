import { ProjectInterface, DfhClassInterface } from "app/core";
import { ComUiContextConfig, ComUiContextInterface, ComUiContextConfigInterface } from "../sdk";

export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm
}

export interface ProjectCrm {
    [dfh_pk_class: number]: ClassConfig
}

export interface ClassConfig extends DfhClassInterface {
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
    fk_property_set?: number,
    property_is_outgoing?: boolean,
    ord_num: number
}



var x: ProjectDetail = {
    crm: {
        21: {
            dfh_pk_class: 21,
            ingoing_properties: [],
            outgoing_properties: [],
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