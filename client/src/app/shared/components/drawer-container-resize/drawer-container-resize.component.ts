
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit, OnDestroy, ContentChild, Output } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gv-drawer-container-resize',
  templateUrl: './drawer-container-resize.component.html',
  styleUrls: ['./drawer-container-resize.component.scss']
})
export class DrawerContainerResizeComponent implements AfterViewInit, OnDestroy {

  destroy$ = new Subject<void>();

  resolution = 10000;
  @Input() drawerWidth = 300;
  @Input() minDrawerWidth = 100;
  @Input() maxDrawerWidth = 600;
  @Input() draggableWidth = 10;

  parentOffsetLeft;

  @ViewChild('sliderWrapper', { static: true }) sliderWrapper: ElementRef;
  @ContentChild(MatDrawer) drawer: MatDrawer;

  showSlider$ = new BehaviorSubject(false);
  initSliderVal;
  initMarginLeft;

  constructor(private elRef: ElementRef) {

  }
  ngAfterViewInit() {
    this.showSlider$.next(this.drawer.opened);

    this.drawer.openedStart.pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (this.initMarginLeft === undefined) this.initMarginLeft = this.drawer._width - (this.draggableWidth / 2);
      this.showSlider$.next(this.drawer.opened);


    })
    this.drawer.closedStart.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.showSlider$.next(this.drawer.opened);
    })
  }

  onDrag($event) {
    if (this.parentOffsetLeft !== undefined) {
      const newWidth = $event.pointerPosition.x - this.parentOffsetLeft + this.minDrawerWidth - (this.draggableWidth / 2)
      if (newWidth >= this.minDrawerWidth && newWidth <= this.maxDrawerWidth) {
        this.drawerWidth = newWidth;
        console.log(this.drawerWidth)
      }
    }
  }

  onDragStarted() {
    const pos = this.getPosition(this.sliderWrapper);
    this.parentOffsetLeft = pos.offsetLeft;
  }

  getPosition(elRef: ElementRef): { offsetTop: number, offsetLeft: number } {
    let offsetLeft = 0;
    let offsetTop = 0;

    let el = elRef.nativeElement;

    while (el) {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.parentElement;
    }
    return { offsetTop: offsetTop, offsetLeft: offsetLeft }
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
