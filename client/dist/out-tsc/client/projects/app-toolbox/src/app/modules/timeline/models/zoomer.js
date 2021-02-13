export class Zoomer {
    constructor(rangeStart, // first pixel (usually 0)
    rangeEnd // last pixel (usually width in px)
    ) {
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
        this.zoomLevels = [
            { intervalUnit: 'days', intervalCount: 1, daysPer100px: 1 },
            { intervalUnit: 'half-months', intervalCount: 1, daysPer100px: 15 },
            { intervalUnit: 'months', intervalCount: 1, daysPer100px: 30 },
            { intervalUnit: 'months', intervalCount: 6, daysPer100px: 180 },
            { intervalUnit: 'years', intervalCount: 1, daysPer100px: 365 },
            { intervalUnit: 'years', intervalCount: 5, daysPer100px: 365 * 5 },
            { intervalUnit: 'years', intervalCount: 10, daysPer100px: 365 * 10 },
            { intervalUnit: 'years', intervalCount: 25, daysPer100px: 365 * 25 },
            { intervalUnit: 'years', intervalCount: 50, daysPer100px: 365 * 50 },
            { intervalUnit: 'years', intervalCount: 100, daysPer100px: 365 * 100 },
            { intervalUnit: 'years', intervalCount: 500, daysPer100px: 365 * 500 },
            { intervalUnit: 'years', intervalCount: 1000, daysPer100px: 365 * 1000 }
        ];
    }
    get pixels() {
        return this.rangeEnd - this.rangeStart;
    }
    get seconds() {
        return this.domainEnd - this.domainStart;
    }
    get days() {
        return this.seconds / 86400;
    }
    get zoomLevel() {
        return this.zoomLevels[this.currentLevel];
    }
    get secondsPerPixel() {
        return this.zoomLevel.daysPer100px * 86400 / 100;
    }
    get canZoomIn() {
        return this.currentLevel > 0;
    }
    get canZoomOut() {
        return this.currentLevel < this.zoomLevels.length - 1;
    }
    /**
     * Sets the extent of the zoomer, used to zoom to the extent
     * @param timeSpanBegin
     * @param timeSpanEnd
     */
    setExtent(timeSpanBegin, timeSpanEnd) {
        if (!timeSpanBegin || !timeSpanEnd || timeSpanBegin >= timeSpanEnd) {
            console.error('Zoomer received invalid extent');
        }
        this.extent = {
            firstSecond: timeSpanBegin,
            lastSecond: timeSpanEnd
        };
    }
    /**
     * Zooms to the extent of the Zoomer
     * if this.extent is set. Use this.setExtent() to set this.extent.
     */
    zoomToExtent() {
        if (this.extent) {
            this.zoomTo(this.extent.firstSecond, this.extent.lastSecond);
        }
    }
    /**
     * Zoom to time span
     * - sets the zoomLevel so that given time span fits in
     * - sets the  domain start and end that zoom level
     */
    zoomTo(timeSpanBegin, timeSpanEnd) {
        const timeSpanDuration = (timeSpanEnd - timeSpanBegin) * 1.1; // add 10% margin
        const days = timeSpanDuration / 86400;
        const dP100 = days / this.pixels * 100; // days per 100 px before finding a zoom level
        this.zoomLevels.some((level, index) => {
            if (level.daysPer100px > dP100) {
                this.currentLevel = index;
                // first sec of timeline
                this.domainStart = timeSpanBegin + ((timeSpanEnd - timeSpanBegin) / 2) - (timeSpanDuration / 2);
                this.domainEnd = this.domainStart + timeSpanDuration;
                return true;
            }
        });
        return this;
    }
    /**
     * Zooms in
     * - gets the previous zoomLevel
     * - sets the new domain start and end according to that zoom level
     */
    zoomIn() {
        this.zoomToLevel(this.currentLevel - 1);
        return this;
    }
    /**
     * Zooms out
     * - gets the next zoomLevel
     * - sets the new domain start and end according to that zoom level
     */
    zoomOut() {
        this.zoomToLevel(this.currentLevel + 1);
        return this;
    }
    zoomToLevel(level) {
        if (level >= 0 && level < this.zoomLevels.length) {
            this.currentLevel = level;
            const newDomainDuration = this.secondsPerPixel * this.pixels;
            const oldDomainDuration = this.domainEnd - this.domainStart;
            const oldDomainCenter = this.domainStart + (oldDomainDuration / 2);
            this.domainStart = oldDomainCenter - (newDomainDuration / 2);
            this.domainEnd = oldDomainCenter + (newDomainDuration / 2);
        }
        return this;
    }
}
//# sourceMappingURL=zoomer.js.map