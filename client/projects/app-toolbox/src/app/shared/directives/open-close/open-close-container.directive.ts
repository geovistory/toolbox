import {
  ChangeDetectorRef,
  ContentChild,
  Directive,
  HostBinding,
  Input
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { OpenCloseChildDirective } from './open-close-child.directive';

@Directive({
  selector: '[gvOpenCloseContainer]',
})
export class OpenCloseContainerDirective {
  destroy$ = new Subject<boolean>();

  @Input() isOpen$: Observable<boolean>;
  @Input() @HostBinding('style.transition.ms') duration: number = 300;
  @HostBinding('style.height') height: string = '0px';
  @HostBinding('style.overflow') overflow: string = 'hidden';

  @ContentChild(OpenCloseChildDirective) child: OpenCloseChildDirective;

  constructor(private ref: ChangeDetectorRef) { }


  ngOnInit() {
    this.isOpen$
      .pipe(
        takeUntil(this.destroy$),
        tap((opening) => {
          if (opening) {
            this.overflow = 'auto';
          } else {
            this.overflow = 'hidden';
          }
          this.height = this.child?.height + 'px';
          this.ref.detectChanges();
        }),
        delay(0),
        tap((opening) => {
          if (!opening) {
            this.height = '0px';
            this.ref.detectChanges();
          }
        }),
        delay(this.duration),
        tap((opening) => {
          if (opening) {
            this.height = 'unset';
            this.ref.detectChanges();
          }
        })
      )
      .subscribe((isOpen) => { });
  }
  ngAfterViewInit() {
    if (!this.child) throw new Error('missing OpenCloseChildDirective')
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
