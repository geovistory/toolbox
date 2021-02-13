import * as tslib_1 from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, Input } from '@angular/core';
import elementResizeDetectorMaker from 'element-resize-detector';
let CoverDirective = class CoverDirective {
    constructor(overlay, container, _viewContainerRef) {
        this.overlay = overlay;
        this.container = container;
        this._viewContainerRef = _viewContainerRef;
    }
    ngAfterViewInit() {
        this.templatePortal = new TemplatePortal(this.gvCover, this._viewContainerRef);
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
        const attached = this.overlayContainer && this.overlayContainer.hasAttached();
        if (attached && !this.gvCoverVisible) {
            this.overlayContainer.detach();
        }
        else if (this.overlayContainer && !attached && this.gvCoverVisible) {
            this.overlayContainer.attach(this.templatePortal);
        }
    }
    ngOnDestroy() {
        this.overlayContainer.detach();
        this.resizeObserver.uninstall(this.nativeElement);
    }
};
tslib_1.__decorate([
    Input()
], CoverDirective.prototype, "gvCover", void 0);
tslib_1.__decorate([
    Input()
], CoverDirective.prototype, "gvCoverVisible", void 0);
CoverDirective = tslib_1.__decorate([
    Directive({
        selector: '[gvCover]'
    })
], CoverDirective);
export { CoverDirective };
//# sourceMappingURL=cover.directive.js.map