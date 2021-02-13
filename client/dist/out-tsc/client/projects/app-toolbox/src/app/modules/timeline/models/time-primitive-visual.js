export class TimePrimitiveVisual {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    initTimePrimitiveVisual(leftOuterOnXAxis) {
        const timePrimitive = leftOuterOnXAxis.timePrimitive;
        this.startDate = timePrimitive.getJulianSecond();
        const dateTime = timePrimitive.getDateTime();
        const endOfDuration = dateTime.getEndOf(timePrimitive.duration);
        this.endDate = endOfDuration.getJulianSecond();
    }
}
//# sourceMappingURL=time-primitive-visual.js.map