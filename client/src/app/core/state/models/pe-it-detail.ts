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

    /** Other Visibility */

    // the bar to above the properties
    showPropertiesHeader?= true;

    // the header with name of peIt
    showHeader?= true;


    /** Right Panel Visibility */

    // show the map
    showMap?= false;

    // show the timeline
    showTimeline?= false;

    // show the mentioned entities of a source
    showMentionedEntities?= false;

    // show the assertions using the entity
    showAssertions?= false;



    /** Left Panel Visibility */

    // the properties with information about the peIt
    showProperties?= false;

    // show the sectionList of a source
    showSectionList?= false;

    // show the reproductions of a section
    showRepros?= false;


    /** Info Visibility */

    showOntoInfo?= false;

    showCommunityStats?= false;


    /** Toggle Buttons Visibility (left panel) */

    // the button to toggle showProperties
    showPropertiesToggle?= false;

    // the button to toggle showSectionList
    showSectionListToggle?= false;

    // the button to toggle showRepros
    showReprosToggle?= false;


    /** Toggle Buttons Visibility (right panel) */

    // the button to toggle showMap
    showMapToggle?= false;

    // the button to toggle showTimeline
    showTimelineToggle?= false;

    // the button to toggle showMentionedEntities
    showMentionedEntitiesToggle?= false;

    // the button to toggle showAssertions
    showAssertionsToggle?= false;


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
