import { DatDigital } from 'app/core';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { IAnnotationPanelState } from 'app/modules/annotation/annotation.models';
import { IVersion } from '../information/components/version-picker/version-picker.component';
import { ClassAndTypeSelector } from '../information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { CreateOrAddEntity } from '../information/containers/create-or-add-entity/api/create-or-add-entity.models';
import { List } from '../information/containers/list/api/list.models';



/**
 * The root state of the sources module
 */
export interface ISourceListState {
    // the filter applied to the list-query
    filter?: string;
    // the list of sources (search result)
    list?: List,
    // if source being created
    create?: CreateOrAddEntity,
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


