import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, delay, filter, first, firstValueFrom, takeUntil, tap, timer } from 'rxjs';

/**
 * This component designed to provide a generic expansion container with smooth height animation.
 * This component allows you to collapse and expand its content with a sliding animation.
 */
@Component({
  selector: 'gv-open-close',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenCloseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  /**
   * isOpen$.next(true) will open, isOpen$.next(false) close the panel
   */
  @Input() isOpen$: Observable<boolean>;
  /**
   * The duration of the height transition
   */
  @Input() @HostBinding('style.transition.ms') duration = 300;
  @HostBinding('style.height') height = '0px';
  @HostBinding('style.overflow') overflow = 'hidden';
  @ViewChild('content', { static: true }) content: ElementRef<HTMLElement>;

  constructor(private ref: ChangeDetectorRef) { }



  async ngOnInit() {
    let oldIsOpen = await firstValueFrom(this.isOpen$);

    // set style according to initial value
    if (oldIsOpen) {
      this.overflow = 'auto';
      this.height = 'unset';
    }
    else {
      this.overflow = 'hidden';
      this.height = '0px';
    }
    const newValArrived$ = new Subject<void>();

    this.isOpen$
      .pipe(
        takeUntil(this.destroy$),
        // if value unchanged, prevent propagation
        filter(newIsOpen => newIsOpen !== oldIsOpen),
        tap((opening) => {
          // cache new val
          oldIsOpen = opening;
          // notify that new val arrived
          newValArrived$.next()

          // if closing, set height to its content as starting point of the transition
          if (!opening) {
            this.overflow = 'hidden';
            this.height = this.content?.nativeElement.offsetHeight + 'px';
            this.ref.detectChanges();
          }
          // if opening
          else {
            // start transition closed -> open
            this.height = this.content?.nativeElement.offsetHeight + 'px';
            // wait for the duration
            timer(this.duration).pipe(
              // unsubscribe if a new val arrives
              takeUntil(newValArrived$),
              // unsubscribe if after the timer fired
              first()
            ).subscribe(() => {
              // set the height to unset (to fit the content, in case its height changes)
              this.overflow = 'auto';
              this.height = 'unset';
              this.ref.detectChanges();
            })
          }
        }),
        delay(0),
        tap((opening) => {
          // if closing
          if (!opening) {
            // start transition open -> closed
            this.height = '0px';
            this.ref.detectChanges();
          }

        }),
      )
      .subscribe();

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
