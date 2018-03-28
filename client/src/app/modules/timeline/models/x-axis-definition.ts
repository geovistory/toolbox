import * as d3 from 'd3';

export class XAxisDefinition {

    /**
     * Add properties of xAxis here
     */

     // Margins relative to canvas
    readonly marginLeft = 40;
    readonly marginRight = 40;
    readonly marginBottom = 20;

    // Domain
    domainStart: number;
    domainEnd: number;

    // Width of the parent element ()
    containerWidth: number;
    containerHeight:number;

    // Range
    readonly rangeStart = 10;
    get rangeEnd():number{
        return this.containerWidth - this.marginLeft - this.marginRight - this.rangeStart;
    };

    // d3 Scale object 
    scale;

    constructor(domainStart = 100, domainEnd = 500, containerWidth = 600, containerHeight = 400) {
        this.domainStart = domainStart;
        this.domainEnd = domainEnd;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;

        this.setScale();
    }


  /** 
   * A method to create an d3 scale object out of a xAxis object
   */
  setScale() {

    this.scale = d3.scaleLinear()
      .domain([this.domainStart, this.domainEnd])
      .range([this.rangeStart, this.rangeEnd]);

  }



}