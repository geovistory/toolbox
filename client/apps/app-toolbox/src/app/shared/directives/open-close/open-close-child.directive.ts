import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[gvOpenCloseChild]'
})
export class OpenCloseChildDirective {
  get height(): number | undefined {
    return this.el?.nativeElement?.offsetHeight;
  }
  constructor(public el: ElementRef) { }
}
