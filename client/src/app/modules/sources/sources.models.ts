import { InfDigitalObject } from 'app/core';
import { IAnnotationPanelState } from 'app/modules/annotation/annotation.models';
import { ClassAndTypeSelector } from '../information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { CreateOrAddPeIt } from '../information/containers/create-or-add-pe-it/api/create-or-add-pe-it.models';


/**
 * The root state of the sources module
 */
export interface ISourceListState {
    // the filter applied to the list-query
    filter?: string;
    // the list of sources (search result)
    list?: { [key: string]: ISourceSearchHitState },
    // if source being created
    create?: CreateOrAddPeIt,
    // the source being edited
    edit?: ISourceDetailState,
    // the source being removed
    remove?: ISourceSearchHitState
    // class and type selector
    classAndTypeSelector?: ClassAndTypeSelector;
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
export interface ISourceDetailState {
    view?: InfDigitalObject;
    edit?: InfDigitalObject;
    annotate?: InfDigitalObject;
    annotationPanel?: IAnnotationPanelState;
    versionList?: IVersion[];
}

export interface IVersion {
    entityVersion: number; // entity_version
    pkEntityVersionConcat: string; // pk_entity_version_concat
    pkEntity: number; // pk_entity
}
