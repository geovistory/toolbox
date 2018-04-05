
import { OnInit, OnDestroy, Directive, ElementRef, Output, EventEmitter } from '@angular/core';

declare var require: any;
const elementResizeDetectorMaker = require('element-resize-detector');


@Directive({
  selector: '[gvDimensionChange]'
})
export class DimensionChangeDirective implements OnInit, OnDestroy
{

    public observer : any;

    @Output() onDimensionsChange : EventEmitter<any> = new EventEmitter();

    constructor( public el : ElementRef ){}

    ngOnInit(){
      const { nativeElement } = this.el;
      const { offsetWidth : width, offsetHeight : height } = nativeElement;
      const dimensions = { width, height };
      const event = new Event( 'dimensions' );

      this.observer = elementResizeDetectorMaker();
      this.observer.listenTo( nativeElement, element =>
      {
          const { offsetWidth : width, offsetHeight : height } = element;
          const dimensions = { width, height };
          event[ 'dimensions' ] = dimensions;
          this.onDimensionsChange.emit( event );
      })
    }

    ngOnDestroy() {
      this.observer.uninstall();
    }
};