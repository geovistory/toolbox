import { EventEmitter } from "@angular/core";
import { Point } from "./point";
import { TimelineOptions } from "../components/timeline/timeline.component";
import { XAxisDefinition } from "./x-axis-definition";
import { ExistenceTime } from "../../information/components/existence-time";
import { InfPersistentItem, InfTemporalEntity } from "../../../core";


/**
 * This class generates all data that are needed to create a visual
 * representation of a timeline.
 */
export class Timeline {

    public ticker: EventEmitter<any> = new EventEmitter();

    public persistentItems: InfPersistentItem[];

    public temporalEntities: InfTemporalEntity[];

    public xAxis: XAxisDefinition;

    public options: TimelineOptions;


    /**
     * Construct the TimeLineChart by passing in data (timePrimitives) and options
     * @param timePrimitives the timePrimitives that will be displayed on the timeline
     * @param options options about the outline of the chart
     */
    constructor(persistentItems: InfPersistentItem[], options: TimelineOptions) {


        this.initData(persistentItems);

        this.options = options;

        // this will also trigger a this.init
        this.zoomToExtent();
    }

    /**
     * Initialize data
     */
    initData(persistentItems) {

        this.persistentItems = persistentItems;

        /** get the first persistent item for now. this is enough for the timeline of one given persitentItem */
        const persistentItem: InfPersistentItem = persistentItems[0];

        this.temporalEntities = persistentItem.pi_roles.map(role => role.temporal_entity)

    }

    init(options: TimelineOptions) {

        this.options = options;

        this.xAxis = new XAxisDefinition(options.domainStart, options.domainEnd, options.width, options.height)

    }

    zoomToExtent() {

        const timePrimitives = []
        this.temporalEntities.forEach((teEnt: any) => {
            const ext: ExistenceTime = teEnt.existenceTime;
            const minMaxOfExTime = ext.getMinMaxTimePrimitive();
            timePrimitives.push(minMaxOfExTime.min)
            timePrimitives.push(minMaxOfExTime.max)
        })

        const minMax = ExistenceTime.getMinMaxTimePrimitveOfArray(timePrimitives);

        this.options.domainStart = minMax.min.getDate();

        this.options.domainEnd = minMax.max.getEndDate();


       this.init(this.options);

    }



    zoomIn() {

        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        const minMax = rangeEnd - rangeStart;
        const rangeDiff = minMax / this.options.zoomFactor;

        this.options.domainStart = this.xAxis.scale.invert(rangeStart + rangeDiff);

        this.options.domainEnd = this.xAxis.scale.invert(rangeEnd - rangeDiff);

        this.init(this.options)
    }

    zoomOut() {

        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        const minMax = rangeEnd - rangeStart;
        const rangeDiff = minMax / this.options.zoomFactor;

        this.options.domainStart = this.xAxis.scale.invert(rangeStart - rangeDiff);

        this.options.domainEnd = this.xAxis.scale.invert(rangeEnd + rangeDiff);

        this.init(this.options)
    }


    getTimeLineChart() {

    }



}