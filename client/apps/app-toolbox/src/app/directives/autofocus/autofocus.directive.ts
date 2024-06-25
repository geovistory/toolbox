import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[gvAutofocus]',
    standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    setTimeout(() =>
      this.el.nativeElement.focus(),
      0)
  }

}