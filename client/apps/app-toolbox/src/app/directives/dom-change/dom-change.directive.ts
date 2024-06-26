import { Directive, Output, EventEmitter, ElementRef, OnDestroy, Input } from '@angular/core';

@Directive({
    selector: '[gvDomChange]',
    standalone: true
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver;

  @Input() gvDomChange;

  @Output() public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {

    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
    });

    this.changes.observe(element, {
      subtree: true,
      attributes: true,
      childList: true,
      // characterData: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
