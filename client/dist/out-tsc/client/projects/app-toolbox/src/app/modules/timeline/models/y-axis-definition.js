import * as d3 from 'd3';
export class YAxisDefinition {
    constructor(config) {
        this.config = config;
        const rangeStart = config.height - config.marginBottom, rangeEnd = config.marginTop;
        this.scale = d3.scaleLinear()
            .domain([config.domainStart, config.domainEnd])
            .range([rangeStart, rangeEnd]);
        const ticks = this.scale.ticks();
        const tickFormat = this.scale.tickFormat(5, '');
        ticks.map(tickFormat);
    }
}
//# sourceMappingURL=y-axis-definition.js.map