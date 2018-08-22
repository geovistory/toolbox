import { PeItSearchHit, PeItDetail } from "app/core";

/**
 * Root state for Information Module
 */
export interface InformationI {
    // search results
    _peIt_list?: { [key: string]: PeItSearchHit },

    // the peIt to remove (are you sure?)
    _peIt_remove?: PeItSearchHit,

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail,

    // the peIt to add
    _peIt_add_form?: PeItDetail

    // the peIt to create
    _peIt_create_form?: PeItDetail
}



export class Information implements InformationI {

    // search results
    _peIt_list?: { [key: string]: PeItSearchHit };

    // the peIt to remove (are you sure?)
    _peIt_remove?: PeItSearchHit;

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail;

    // the peIt to add
    _peIt_add_form?: PeItDetail;

    // the peIt to create
    _peIt_create_form?: PeItDetail;

    constructor(data?: InformationI) {
        Object.assign(this, data);
    }
}