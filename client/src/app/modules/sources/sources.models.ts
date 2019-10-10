import { DatDigital } from 'app/core';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { IVersion } from 'app/modules/data/components/version-picker/version-picker.component';
import Delta from 'quill/node_modules/quill-delta';
import { List } from '../information/containers/list/api/list.models';


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
    // mentionedEntities: { [key: string]: MentionedEntity }

}

/**
 * State of a AnnotationEdit
 */
export interface AnnotationCtrlState {

    // reference to the exact place of mentioning within a digital object
    chunk?: IChunk; // add other types of references here, like a spot in a image

    // // entities mentioned by the chunk
    // mentionedEntities?: { [key: string]: MentionedEntity }

    // when true, the user can select the segment (chunk of text / spot of image)
    selectingSegment?: boolean;

    // when true, the user can select entities
    selectingEntities?: boolean;
}


// TODO Replace IChunk with InfChunk!

export interface IChunk {
    quillDelta?: Delta; // TODO -> jsQuill's AbstractDelta Type
    fkDigitalObject?: number;  // reference to source
    pkEntity?: number
}

export class Chunk {
    quillDelta: Delta; // TODO -> jsQuill's AbstractDelta Type
    fkDigitalObject: number;  // reference to source
    pkEntity: number

    constructor(data?: IChunk) {
        Object.assign(this, data);
    }

}



/**
 * The root state of the sources module
 */
export interface ISourceListState {
    // the filter applied to the list-query
    filter?: string;
    // the list of sources (search result)
    list?: List,
    // if source being created
    // create?: CreateOrAddEntity,
    // the source being edited
    edit?: ISourceDetailState,
    // the source being removed
    remove?: ISourceSearchHitState
    // class and type selector
    // classAndTypeSelector?: ClassAndTypeSelector;
}

/**
 * The state of a source preview in a search result or when being removed
 */
export interface ISourceSearchHitState {
    label: string,
    version: number,
    id: number
}

/**
 * The state of a source being edited
 */
export class ISourceDetailState {

    _type?: TypeDetail;

    view?: DatDigital;
    edit?: DatDigital;
    annotate?: DatDigital;
    annotationPanel?: IAnnotationPanelState;
    versionList?: IVersion[];

    constructor(data?: ISourceDetailState) {
        Object.assign(this, data);
    }

}

/**
 * The state of a section list with add button etc.
 */
export class SectionListState {
    items?: SectionListItem
}

/**
 * The state of a section list item
 */
export class SectionListItem {
    reference?: string;
    title?: string;
    repros?: string[];
}
/**
 * The state of a section being edited
 */
export interface SectionDetailState {
    view?: DatDigital;
    edit?: DatDigital;
    annotate?: DatDigital;
    annotationPanel?: IAnnotationPanelState;
    versionList?: IVersion[];
}


