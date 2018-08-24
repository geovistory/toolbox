import { DataUnitI, DataUnit } from "./data-unit";
import { InfPersistentItem } from "app/core/sdk";
import { TimeLineSettings } from "app/modules/timeline/models/timeline";

export interface PeItDetailI extends DataUnitI {

    // record
    peIt?: InfPersistentItem;

    form?: any;

    /** display data */
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;
    loading?: boolean; // for leaf pe it view
    leafPeItLoading?: boolean;
    _leaf_peIt_modal?: PeItDetail // for leaf pe it view modal

    /** Timeline */
    timeLineSettings?: TimeLineSettings;
}

export class PeItDetail extends DataUnit implements PeItDetailI {

    // record
    peIt?: InfPersistentItem;

    form?: any;

    /** display data */
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;
    loading?: boolean; // for leaf pe it view
    leafPeItLoading?: boolean;
    _leaf_peIt_modal?: PeItDetail // for leaf pe it view modal

    /** Timeline */
    timeLineSettings?: TimeLineSettings;
    
    constructor(data?: PeItDetailI) {
        super();
        Object.assign(this, data);
    }
}