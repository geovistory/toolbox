import { QuillDoc } from 'app/modules/quill';

export interface Mentioning {
    pk_entity?: number // pk of the entity association
    fk_domain_entity?: number
    fk_property?: number
    fk_range_entity?: number
    fk_expression_entity?: number
    fk_source_entity?: number
    fk_chunk?: number
    js_quill_data?: QuillDoc
}

export type MentioningListType =
    'ofSection' // if the list is embeded on a screen of a section (F2 Expression) showing mentioned entities
    | 'ofSource' // if the list is embeded on a screen of a source (F3/F4/F5) showing mentioned entities
    | 'ofEntity' // if the list is embeded on a screen of a DataUnit showing sources that mention the entity
    ;

// Class of this slice of store
export class MentioningList implements MentioningList {
    items?: Mentioning[];
    loading?: boolean;
    error?: any;

    mentioningListType?: MentioningListType;

    create?: boolean;

    /**
     * These properties are there as presets for creating a new mentioning.
     *
     * 1. Add a Mentioned Entity to a source-like thing:
     *
     * 1.1. For associating a SOURCE (F3/F4) to entity provide
     *      - sourceEntity
     * 1.2. For associating a SECTION (F2) to entity provide
     *      - sourceEntity
     *      - sectionEntity
     * 1.3. For associating a CHUNK (GeovC?) to entity provide
     *      - sourceEntity
     *      - sectionEntity
     *      - chunkEntity
     *
     * 2. Add a source-like thing to a Entity provide
     *      - mentionedEntity
     */
    sourceEntityPk?: number;
    sectionEntityPk?: number;
    chunkEntityPk?: number;
    mentionedEntityPk?: number;

    constructor(data?: MentioningList) {
        Object.assign(this, data);
    }
}
