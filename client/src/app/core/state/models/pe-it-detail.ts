import { InfPersistentItem } from 'app/core/sdk';
import { TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { DataUnit } from './data-unit';
import { SectionList } from 'app/modules/information/containers/section-list/api/section-list.models';
import { Repros } from 'app/modules/information/containers/repros/api/repros.models';


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

    // show the map (only visible if showRightPanel = true)
    showMap?= true;

    // show the timeline (only visible if showRightPanel = true)
    showTimeline?= true;

    // show the mentioned entities of a source (only visible if showRightPanel = true)
    showMentionedEntities?= false;

    // show the assertions using the entity (only visible if showRightPanel = true)
    showAssertions?= false;

    // show the sectionList of a source
    showSectionList?= false;

    // show the reproductions of a section
    showRepros?= false;

    // the bar to above the properties
    showPropertiesHeader?= true;

    // the properties with information about the peIt
    showProperties?= true;

    // the header with name of peIt
    showHeader?= true;


    ontoInfoVisible?= false;
    communityStatsVisible?= false;
    loading?: boolean; // for leaf pe it view
    leafPeItLoading?: boolean;
    _leaf_peIt_modal?: PeItDetail; // for leaf pe it view modal

    // sections of a source (related with an entity association)
    sectionList?: SectionList;

    // reproductions of a section
    repros?: Repros;

    /** Timeline */
    timeLineSettings?: TimeLineSettings;

    constructor(data?: PeItDetail) {
        super();
        Object.assign(this, data);
    }

}
