import { InfPersistentItem } from 'app/core/sdk';
import { TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { DataUnit } from './data-unit';


export class PeItDetail extends DataUnit {

    // record
    peIt?: InfPersistentItem;

    form?: any;

    /**
     * Display settings with defaults.
     * To customize the default values, provide the value in the data of the constructor
     */

    // the panel with map, timeline ect.
    showRightPanel?= true;

    // the bar to above the properties
    showPropertiesHeader?= true;

    // the header with name of peIt
    showHeader?= true;

    ontoInfoVisible?= false;
    communityStatsVisible?= false;
    loading?: boolean; // for leaf pe it view
    leafPeItLoading?: boolean;
    _leaf_peIt_modal?: PeItDetail // for leaf pe it view modal

    /** Timeline */
    timeLineSettings?: TimeLineSettings;

    constructor(data?: PeItDetail) {
        super();
        Object.assign(this, data);
    }

}
