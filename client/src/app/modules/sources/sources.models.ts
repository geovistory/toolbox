import { InfDigitalObject } from "app/core";
import { IAnnotationPanelState } from "app/modules/annotation/annotation.models";
import { QuillDoc } from "../quill/quil.models";


/**
 * The root state of the sources module
 */
export interface ISourceListState {
    // the filter applied to the list-query
    filter?: string;
    // the list of sources (search result)
    list?: { [key: string]: ISourceSearchHitState },
    // if source being created
    create?: boolean,
    // the source being edited
    edit?: ISourceDetailState,
    // the source being removed
    remove?: ISourceSearchHitState
}

/**
 * The state of a source preview in a search result or when being removed
 */
export interface ISourceSearchHitState {
    label: string,
    id: number
}

/**
 * The state of a source being edited
 */
export interface ISourceDetailState {
    view?: QuillDoc;
    edit?: QuillDoc;
    annotate?: QuillDoc;
    annotationPanel?: IAnnotationPanelState;
}


