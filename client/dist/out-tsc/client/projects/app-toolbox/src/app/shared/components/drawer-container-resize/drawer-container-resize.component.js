import * as tslib_1 from "tslib";
import { takeUntil } from 'rxjs/operators';
import { Component, ViewChild, Input, ContentChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, BehaviorSubject } from 'rxjs';
let DrawerContainerResizeComponent = class DrawerContainerResizeComponent {
    constructor(elRef) {
        this.elRef = elRef;
        this.destroy$ = new Subject();
        this.resolution = 10000;
        this.drawerWidth = 300;
        this.minDrawerWidth = 100;
        this.maxDrawerWidth = 600;
        this.draggableWidth = 10;
        this.showSlider$ = new BehaviorSubject(false);
    }
    ngAfterViewInit() {
        this.showSlider$.next(this.drawer.opened);
        this.drawer.openedStart.pipe(takeUntil(this.destroy$)).subscribe(val => {
            if (this.initMarginLeft === undefined)
                this.initMarginLeft = this.drawer._width - (this.draggableWidth / 2);
            this.showSlider$.next(this.drawer.opened);
        });
        this.drawer.closedStart.pipe(takeUntil(this.destroy$)).subscribe(val => {
            this.showSlider$.next(this.drawer.opened);
        });
    }
    onDrag($event) {
        if (this.parentOffsetLeft !== undefined) {
            const newWidth = $event.pointerPosition.x - this.parentOffsetLeft + this.minDrawerWidth - (this.draggableWidth / 2);
            if (newWidth >= this.minDrawerWidth && newWidth <= this.maxDrawerWidth) {
                this.drawerWidth = newWidth;
                // console.log(this.drawerWidth)
            }
        }
    }
    onDragStarted() {
        const pos = this.getPosition(this.sliderWrapper);
        this.parentOffsetLeft = pos.offsetLeft;
    }
    getPosition(elRef) {
        let offsetLeft = 0;
        let offsetTop = 0;
        let el = elRef.nativeElement;
        while (el) {
            offsetLeft += el.offsetLeft;
            offsetTop += el.offsetTop;
            el = el.parentElement;
        }
        return { offsetTop: offsetTop, offsetLeft: offsetLeft };
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], DrawerContainerResizeComponent.prototype, "drawerWidth", void 0);
tslib_1.__decorate([
    Input()
], DrawerContainerResizeComponent.prototype, "minDrawerWidth", void 0);
tslib_1.__decorate([
    Input()
], DrawerContainerResizeComponent.prototype, "maxDrawerWidth", void 0);
tslib_1.__decorate([
    Input()
], DrawerContainerResizeComponent.prototype, "draggableWidth", void 0);
tslib_1.__decorate([
    ViewChild('sliderWrapper', { static: true })
], DrawerContainerResizeComponent.prototype, "sliderWrapper", void 0);
tslib_1.__decorate([
    ContentChild(MatDrawer, /* TODO: check static flag */ { static: false })
], DrawerContainerResizeComponent.prototype, "drawer", void 0);
DrawerContainerResizeComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-drawer-container-resize',
        templateUrl: './drawer-container-resize.component.html',
        styleUrls: ['./drawer-container-resize.component.scss']
    })
], DrawerContainerResizeComponent);
export { DrawerContainerResizeComponent };
//# sourceMappingURL=drawer-container-resize.component.js.map