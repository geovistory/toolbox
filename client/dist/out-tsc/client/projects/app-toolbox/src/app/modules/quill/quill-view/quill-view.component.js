import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
let QuillViewComponent = class QuillViewComponent {
    constructor(quillService) {
        this.quillService = quillService;
        this.Quill = quillService.Quill;
    }
    ngOnChanges() {
        this.quillEditor = new this.Quill(this.editorElem.nativeElement, {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            }
        });
        if (this.formatItalic) {
            if (this.contents && this.contents.ops) {
                this.contents.ops.forEach(op => {
                    if (op.attributes && op.attributes.node) {
                        op.attributes = {
                            node: op.attributes.node,
                            italic: true
                        };
                    }
                });
            }
        }
        // set the initial contents
        this.quillEditor.setContents(this.contents);
    }
};
tslib_1.__decorate([
    Input()
], QuillViewComponent.prototype, "contents", void 0);
tslib_1.__decorate([
    Input()
], QuillViewComponent.prototype, "formatItalic", void 0);
tslib_1.__decorate([
    ViewChild('editor', { static: true })
], QuillViewComponent.prototype, "editorElem", void 0);
QuillViewComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-quill-view',
        templateUrl: './quill-view.component.html',
        styleUrls: ['./quill-view.component.scss']
    })
], QuillViewComponent);
export { QuillViewComponent };
//# sourceMappingURL=quill-view.component.js.map