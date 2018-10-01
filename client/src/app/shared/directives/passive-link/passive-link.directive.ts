import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[href].gv-passive-link'
})

export class PassiveLinkDirective {
  @Input() href;

  @HostListener('click', ['$event']) preventDefault(event) {
    if (this.href.length == 0) event.preventDefault();
  }

}
