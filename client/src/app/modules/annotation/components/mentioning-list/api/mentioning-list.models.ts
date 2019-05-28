import { DatChunk, InfEntityAssociation } from 'app/core';
import { QuillDoc } from '../../../../quill/quill.models';



export interface MentionedEntity {
    pkEntity: number;
    label: string;
    entityAssociation: InfEntityAssociation;
}



export interface Mentioning {
    pk_entity?: number // pk of the entity association
    fk_info_domain?: number
    fk_property?: number
    fk_info_range?: number
    fk_expression_entity?: number
    fk_source_entity?: number
    fk_chunk?: number
    quill_doc?: QuillDoc
}

export type MentioningListType =
    'ofSection' // if the list is embeded on a screen of a section (F2 Expression) showing mentioned entities
    | 'ofSource' // if the list is embeded on a screen of a source (F3/F4/F5) showing mentioned entities
    | 'ofEntity' // if the list is embeded on a screen of a Entity showing sources that mention the entity
    ;

// Class of this slice of store
export class MentioningList implements MentioningList {
    items?: Mentioning[];
    loading?: boolean;
    error?: any;


    mentioningListType?: MentioningListType;

    constructor(data?: MentioningList) {
        Object.assign(this, data);
    }
}
