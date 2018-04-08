import { EventEmitter } from "@angular/core";
import { Point } from "./point";
import { TimelineOptions } from "../components/timeline/timeline.component";
import { XAxisDefinition } from "./x-axis-definition";
import { ExistenceTime } from "../../information/components/existence-time";
import { InfPersistentItem, InfTemporalEntity, GregorianDateTime, JulianDateTime } from "../../../core";


/**
 * This class generates all data that are needed to create a visual
 * representation of a timeline.
 */
export class Timeline {

    public ticker: EventEmitter<any> = new EventEmitter();

    public persistentItems: InfPersistentItem[];

    public temporalEntities: InfTemporalEntity[];

    /** xAxis fixed top */
    public xAxis: XAxisDefinition;
    public xAxisGreg: XAxisDefinition;

    /** xAxis ticks on rows */
    public xAxisTicks: XAxisDefinition;
    public xAxisGregTicks: XAxisDefinition;


    public options: TimelineOptions;


    /**
     * Construct the TimeLineChart by passing in data (timePrimitives) and options
     * @param timePrimitives the timePrimitives that will be displayed on the timeline
     * @param options options about the outline of the chart
     */
    constructor(persistentItems: InfPersistentItem[], options: TimelineOptions) {

        this.initData(persistentItems);

        this.options = options;

        if (this.temporalEntities.length > 0) {

            // this will also trigger a this.init
            this.zoomToExtent();

        } else {
            this.init(this.options);
        }

    }

    /**
     * Initialize data
     */
    initData(persistentItems) {

        this.persistentItems = persistentItems;

        if (persistentItems && persistentItems.length > 0) {

            /** get the first persistent item for now. this is enough for the timeline of one given persitentItem */
            const persistentItem: InfPersistentItem = persistentItems[0];

            this.temporalEntities = persistentItem.pi_roles.map(role => role.temporal_entity)

        } else {
            this.temporalEntities = [];
        }

    }

    init(options: TimelineOptions) {

        this.options = options;

        const switchBetweenCalendars = 2299161 * 24 * 60 * 60;

        /** xAxis fixed top */

        let xAxisTopOptions = {
            domainStart: options.domainStart,
            domainEnd: options.domainEnd,
            containerWidth: options.width,
            containerHeight: options.height,
            tickSizeInner: 0,
            tickSizeOuter: 0
        }

        // Julian fixed top
        this.xAxis = new XAxisDefinition({
            ...xAxisTopOptions,
            maxJulianSecond: switchBetweenCalendars, // visible until ~1582
            calendar: 'julian',
        })

        // Gregorian fiyed top
        this.xAxisGreg = new XAxisDefinition({
            ...xAxisTopOptions,
            minJulianSecond: switchBetweenCalendars, // visible from ~1582
            calendar: 'gregorian',
        })



        const tickSize = this.temporalEntities.length * this.options.rowHeight;

        /** xAxis ticks on rows */
        let xAxisOnRows = {
            domainStart: options.domainStart,
            domainEnd: options.domainEnd,
            containerWidth: options.width,
            containerHeight: options.height,
            tickSizeInner: tickSize,
            tickSizeOuter: 0,
            marginTop: 0
        }

        // Julian on rows
        this.xAxisTicks = new XAxisDefinition({
            ...xAxisOnRows,
            calendar: 'julian',
            maxJulianSecond: switchBetweenCalendars, // visible until introduction of gregorian calendar in 1582
        })

        //Gregorian on rows        
        this.xAxisGregTicks = new XAxisDefinition({
            ...xAxisOnRows,
            calendar: 'gregorian',
            minJulianSecond: switchBetweenCalendars, // visible from introduction of gregorian calendae in 1582
        })




    }

    zoomToExtent() {

        const timePrimitives = []
        this.temporalEntities.forEach((teEnt: any) => {
            const ext: ExistenceTime = teEnt.existenceTime;
            const minMaxOfExTime = ext.getMinMaxTimePrimitive();

            if (minMaxOfExTime) {
                timePrimitives.push(minMaxOfExTime.min);
                timePrimitives.push(minMaxOfExTime.max);
            }
        })
        if (timePrimitives.length > 0) {

            const minMax = ExistenceTime.getMinMaxTimePrimitveOfArray(timePrimitives);

            // zoom out a little bit
            const domainDiff = Math.abs(minMax.min.getJulianSecond() - minMax.max.getJulianSecond());
            const margin = domainDiff * 0.05;

            this.options.domainStart = minMax.min.getJulianSecond() - margin;

            this.options.domainEnd = minMax.max.getLastSecond() + margin;
        }

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

    /**
     * Moves the timeline for a given number of pixels.
     * 
     * @param rangeDiff pixels to move
     */
    move(rangeDiff) {
        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        this.options.domainStart = this.xAxis.scale.invert(rangeStart + rangeDiff);
        this.options.domainEnd = this.xAxis.scale.invert(rangeEnd + rangeDiff);
        this.init(this.options)
    }

    getTimeLineChart() {

    }



}