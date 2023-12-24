import * as d3 from 'd3';
import { ScaleLinear } from 'd3';

export interface YAxisDefinitionConfig {
  domainStart: number,
  domainEnd: number,
  height: number
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  tickSizeInner: number,
  tickSizeOuter: number,
  tickPadding: number
}
export class YAxisDefinition {

  scale: ScaleLinear<number, number>;

  constructor(public config: YAxisDefinitionConfig) {

    const rangeStart = config.height - config.marginBottom, rangeEnd = config.marginTop;

    this.scale = d3.scaleLinear()
      .domain([config.domainStart, config.domainEnd])
      .range([rangeStart, rangeEnd]);

    const ticks = this.scale.ticks()

    const tickFormat = this.scale.tickFormat(5, '')

    ticks.map(tickFormat);


  }

}
