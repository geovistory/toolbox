import { InfEntityAssociation } from "app/core";
import * as Delta from 'quill-delta/lib/delta';

/**
 * Root state interface of this model
 */
export interface IAnnotationPanelState {
    view?: { [key: string]: AnnotationState };
    edit?: AnnotationCtrlState;
    remove?: AnnotationState;    
}

/**
 * State of a Annotation
 */
export interface AnnotationState {

    // reference to the exact place of mentioning within a digital object
    chunk: IChunk; // add other types of references here, like a spot in a image

    // entities mentioned by the chunk
    mentionedEntities: { [key: string]: MentionedEntity }

}

/**
 * State of a AnnotationEdit
 */
export interface AnnotationCtrlState {

    // reference to the exact place of mentioning within a digital object
    chunk?: IChunk; // add other types of references here, like a spot in a image

    // entities mentioned by the chunk
    mentionedEntities?: { [key: string]: MentionedEntity }

    // when true, the user can select the segment (chunk of text / spot of image)
    selectingSegment?: boolean;

    // when true, the user can select entities
    selectingEntities?: boolean;
}


// TODO Replace IChunk with InfChunk!

export interface IChunk {
    quillDelta?: Delta; //TODO -> jsQuill's AbstractDelta Type
    fkDigitalObject?: number;  // reference to source 
    pkEntity?: number
}

export class Chunk {
    quillDelta: object; //TODO -> jsQuill's AbstractDelta Type
    fkDigitalObject: number;  // reference to source 
    pkEntity: number

    constructor(data?: IChunk) {
        Object.assign(this, data);
    }

}

/**
 * used by MentionedEntityComponent 
 */
export interface MentionedEntity {
    pkEntity: number;
    label: string;
    entityAssociation: InfEntityAssociation;
}



