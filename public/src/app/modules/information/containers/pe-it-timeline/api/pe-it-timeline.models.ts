import { TimeLineSettings } from 'app/modules/timeline/models/timeline';

// Class of this slice of store
export class PeItTimeline {

    timeLineSettings?: TimeLineSettings

    constructor(data?: PeItTimeline) {
        Object.assign(this, data);
    }
}
