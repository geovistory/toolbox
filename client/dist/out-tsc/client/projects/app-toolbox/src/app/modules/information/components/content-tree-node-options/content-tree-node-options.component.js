import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ContentTreeNodeOptionsComponent = class ContentTreeNodeOptionsComponent {
    constructor(importTableSocket) {
        this.importTableSocket = importTableSocket;
        this.destroy$ = new Subject();
        this.rootIsF2Expression = false;
        this.clicked = new EventEmitter();
        this.loaded$ = new BehaviorSubject(true);
        this.mode$ = new BehaviorSubject('indeterminate');
        this.value$ = new BehaviorSubject(0);
    }
    ngOnInit() {
        this.importTableSocket.cleanConnect();
        if (this.node && this.isDigital) {
            if (this.node.datDigital.fk_system_type == 3287) {
                this.loaded$.next(false);
                this.importTableSocket.emit('listenDigitals', [this.node.pkDigital]);
                this.importTableSocket.on('state_' + this.node.pkDigital, (state) => {
                    this.loaded$.next(state.advancement == 100);
                    this.mode$.next(0 < state.advancement ? 'determinate' : 'indeterminate');
                    this.value$.next(state.advancement);
                });
                this.importTableSocket.fromEvent('reconnect')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(disconnect => {
                    this.importTableSocket.emit('listenDigitals', [this.node.pkEntity]);
                });
            }
        }
    }
    openNode(n) {
        this.clicked.emit({ openNode: n });
    }
    removeStatement(n) {
        this.clicked.emit({ removeStatement: n });
    }
    addExpressionPortion(parentN) {
        this.clicked.emit({ addExpressionPortion: parentN });
    }
    addText(parentN) {
        this.clicked.emit({ addText: parentN });
    }
    addTable(parentN) {
        this.clicked.emit({ addTable: parentN });
    }
    ngOnDestroy() {
        this.importTableSocket.cleanDisconnect();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], ContentTreeNodeOptionsComponent.prototype, "node", void 0);
tslib_1.__decorate([
    Input()
], ContentTreeNodeOptionsComponent.prototype, "isDigital", void 0);
tslib_1.__decorate([
    Input()
], ContentTreeNodeOptionsComponent.prototype, "pkParent", void 0);
tslib_1.__decorate([
    Input()
], ContentTreeNodeOptionsComponent.prototype, "rootIsF2Expression", void 0);
tslib_1.__decorate([
    Input()
], ContentTreeNodeOptionsComponent.prototype, "isAdmin", void 0);
tslib_1.__decorate([
    Output()
], ContentTreeNodeOptionsComponent.prototype, "clicked", void 0);
ContentTreeNodeOptionsComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-content-tree-node-options',
        templateUrl: './content-tree-node-options.component.html',
        styleUrls: ['./content-tree-node-options.component.scss']
    })
], ContentTreeNodeOptionsComponent);
export { ContentTreeNodeOptionsComponent };
//# sourceMappingURL=content-tree-node-options.component.js.map