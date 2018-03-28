import { EventEmitter } from "@angular/core";
import { Point } from "./point";
import { TimelineOptions } from "../components/timeline/timeline.component";
import { XAxisDefinition } from "./x-axis-definition";


/**
 * This class generates all data that are needed to create a visual
 * representation of a timeline.
 */
export class Timeline {

    public ticker: EventEmitter<any> = new EventEmitter();

    public points: Point[];

    public xAxis: XAxisDefinition;


    /**
     * Construct the TimeLineChart by passing in data (points) and options
     * @param points the points that will be displayed on the timeline
     * @param options options about the outline of the chart
     */
    constructor(points: Point[], options: TimelineOptions) {

        this.points = points;

        this.init(options)

    }

    /**
     * Initialize x-axis
     */
    initXAxis() {

    }

    init(options: TimelineOptions) {

        this.xAxis = new XAxisDefinition(options.domainStart,options.domainEnd,options.width,options.height)

    }


    getTimeLineChart() {

    }



}