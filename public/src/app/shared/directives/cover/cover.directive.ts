import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import elementResizeDetectorMaker from 'element-resize-detector';


@Directive({
  selector: '[gvCover]'
})
export class CoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() gvCover: TemplateRef<any>;
  @Input() gvCoverVisible: boolean;

  overlayContainer: OverlayRef;
  templatePortal: TemplatePortal;
  resizeObserver: elementResizeDetectorMaker.Erd;
  nativeElement: any;

  constructor(
    private overlay: Overlay,
    private container: ElementRef,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(
      this.gvCover,
      this._viewContainerRef
    );

    this.nativeElement = this.container.nativeElement;

    this.overlayContainer = this.overlay.create({
      hasBackdrop: false,
      panelClass: 'gv-cover-panel',
      width: 0,
      height: 0,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.container)
        .withPositions([
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'center'
          }
        ])
    });

    this.resizeObserver = elementResizeDetectorMaker();
    this.resizeObserver.listenTo(this.nativeElement, element => {
      const { offsetWidth: width, offsetHeight: height } = element;
      this.overlayContainer.updateSize({ width, height });
    });

    if (this.gvCoverVisible) {
      this.overlayContainer.attach(this.templatePortal);
    }
  }

  ngOnChanges() {
    const attached =
      this.overlayContainer && this.overlayContainer.hasAttached();
    if (attached && !this.gvCoverVisible) {
      this.overlayContainer.detach();
    } else if (this.overlayContainer && !attached && this.gvCoverVisible) {
      this.overlayContainer.attach(this.templatePortal);
    }
  }
  ngOnDestroy() {
    this.overlayContainer.detach();

    this.resizeObserver.uninstall(this.nativeElement);
  }
}
