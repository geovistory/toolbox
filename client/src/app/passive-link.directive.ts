import { Directive, Input } from '@angular/core';

@Directive({
  selector : '[href]',
  host : {
    '(click)' : 'preventDefault($event)'
  }
})

export class PassiveLinkDirective {

  @Input() href;
  preventDefault(event) {
    if(this.href.length == 0) event.preventDefault();
  }

}
