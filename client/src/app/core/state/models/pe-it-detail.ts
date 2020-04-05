import { InfPersistentItem } from 'app/core/sdk';
import { TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { Entity } from './entity';
// import { Repros } from 'app/modules/information/containers/repros/api/repros.models';
import { PeItTimeline } from 'app/modules/information/containers/pe-it-timeline/api/pe-it-timeline.models';

export interface PeItDetailList { [pk_entity: number]: PeItDetail };


export class PeItDetail extends Entity {




  // // record
  // peIt?: InfPersistentItem;

  // form?: any;

  // /**
  //  * Display settings with defaults.
  //  * To customize the default values, provide the value in the data of the constructor
  //  */



  // /** Right Panel Visibility */

  // // show the map
  // showMap?= false;

  // // show the timeline
  // showTimeline?= false;

  // // show the mentioned entities of a source
  // showMentionedEntities?= false;

  // // show the assertions using the entity
  // showAssertions?= false;

  // // show the linked sources of a peIt
  // showSources?= false;

  // // show the digitals of a peIt
  // showDigitals?= false;



  // // show the sectionList of a source
  // showSectionList?= false;

  // // show the reproductions of a section
  // showRepros?= false;


  // /** Info Visibility */

  // showOntoInfo?= false;

  // showCommunityStats?= false;


  // /** Toggle Buttons Visibility (left panel) */

  // // the button to toggle showProperties
  // showPropertiesToggle?= false;

  // // the button to toggle showSectionList
  // showSectionListToggle?= false;

  // // the button to toggle showRepros
  // showReprosToggle?= false;



  // loading?: boolean; // for leaf pe it view


  constructor(data?: PeItDetail) {
    super();
    Object.assign(this, data);
  }

}
