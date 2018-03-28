import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Point } from '../models/point';
import { Timeline } from '../models/timeline';
import { XAxisDefinition } from '../models/x-axis-definition';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class D3Service {


  /** This service will provide methods to enable user interaction with elements
  * while maintaining the d3 simulations physics
  */
  constructor() { }





  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour() { }



  /** 
   * A method to bind a draggable behaviour to an svg element
   */
  applyDraggableBehaviour(element, point: Point) {
    const d3element = d3.select(element);

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3.event.sourceEvent.stopPropagation();

      // if (!d3.event.active) {
      //   graph.simulation.alphaTarget(0.3).restart();
      // }

      d3.event.on("drag", dragged).on("end", ended);

      function dragged() {
        point.x = d3.event.x;
        point.y = d3.event.y;
        console.log(d3.event.x)
      }

      function ended() {
        // if (!d3.event.active) {
        //   graph.simulation.alphaTarget(0);
        // }

        // point.x = null;
        // point.y = null;
      }
    }

    d3element.call(d3.drag()
      .on("start", started));
  }



  /**
   * A method to bind a draggable behaviour to a xAxis element
   */
  applyDraggableXAxisBehaviour(element): Observable<any> {

    return new Observable(observer => {

      const d3element = d3.select(element);

      var started = () => {
        /** Preventing propagation of dragstart to parent elements */
        d3.event.sourceEvent.stopPropagation();
        
        let beforeDraggedX = d3.event.x;
        
        function dragged() {
          observer.next({endX: d3.event.x , startX:beforeDraggedX})
          beforeDraggedX = d3.event.x;
        }
        
        var ended = () => {
          
        }
        
        d3.event.on("drag", dragged).on("end", ended);

      }

      d3element.call(d3.drag()
        .on("start", started));

    })

  }




  /** 
   * A method to create an x-axis out of an svg element 
   */
  apllyXAxis(element, xAxis: XAxisDefinition) {
    const d3element = d3.select(element);


    const axis = d3.axisBottom(xAxis.scale).ticks(20);

    const distanceFromTop = (xAxis.containerHeight - xAxis.marginBottom);

    d3element.attr("transform", "translate(0," + distanceFromTop + ")").call(axis);
  }


  /** 
   * A method to place  an x-axis out of an svg element 
   */
  placeOnXAxis(element, options: { point: Point, xAxis: XAxisDefinition }) {
    const d3element = d3.select(element);

    d3element.attr("transform", "translate(" + options.xAxis.scale(options.point.x) + ", 300)")
  }




  /** The interactable timeline chart
  * This method does not interact with the document, purely physical calculations with d3
  */
  getTimeline(points: Point[], options) {
    return new Timeline(points, options);
  }


}
