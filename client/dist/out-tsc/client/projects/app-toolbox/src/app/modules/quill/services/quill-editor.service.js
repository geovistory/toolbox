import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, timer } from 'rxjs';
import { ProgressDialogComponent } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { takeUntil } from 'rxjs/operators';
let QuillEditorService = class QuillEditorService {
    constructor(quillService, quillEditorRegistry, rendererFactory, dialog) {
        this.quillService = quillService;
        this.quillEditorRegistry = quillEditorRegistry;
        this.dialog = dialog;
        // index of nodes, where key = charid, value = Node
        this.domNodes = {};
        // index of nodes, where key = charid, value = array of numbers (e.g. pk_entity of chunks)
        this.highlightNodes = {};
        // index of click Callbacks, needed for removing eventListeners
        this.clickCbIndex = {};
        // index of mouseenter Callbacks, needed for removing eventListeners
        this.mouseenterCbIndex = {};
        // index of mouseleave Callbacks, needed for removing eventListeners
        this.mouseleaveCbIndex = {};
        // emits the charid of the clicked highlighted node
        this.highlightClicked$ = new Subject();
        // emits the charid of the mouseentered highlighted node
        this.highlightMouseentered$ = new Subject();
        // emits the charid of the mouseleft highlighted node
        this.highlightMouseleft$ = new Subject();
        // max number of characters allowed in text
        this.maxLength = Number.POSITIVE_INFINITY;
        // flag to prevent updating of content
        this.batchInsertingContent = true;
        this.createEditor = (el, editorConfig, updateComponent, maxLength, destroy$) => {
            this.maxLength = maxLength;
            this.quillEditor = new this.quillService.Quill(el, editorConfig);
            this.quillEditorRegistry.registerService(this.quillEditor.scroll.domNode, this, destroy$);
            this.updateComponent = updateComponent;
            return this.quillEditor;
        };
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * adds a domNode to the index this.domNodes
     */
    addDomNode(key, value) {
        if (!this.domNodes[key])
            this.domNodes[key] = value;
    }
    /**
    * removes a domNode to the index this.domNodes
    */
    removeDomNode(key) {
        delete this.domNodes[key];
    }
    /**
     * Enables the highlighting of the node with given charid
     * Extracts the DomNode from "domNodes" where the key matches charid.
     * - adds class for highlighting
     * - adds event listeners for click, mouseenter, mouseleave
     */
    highlightNode(charid) {
        const n = this.domNodes[charid];
        if (n) {
            this.renderer.addClass(n, 'gv-quill-text-highlight');
            this.clickCbIndex[charid] = () => { this.highlightClicked$.next(charid); };
            n.addEventListener('click', this.clickCbIndex[charid]);
            this.mouseenterCbIndex[charid] = () => { this.highlightMouseentered$.next(charid); };
            n.addEventListener('mouseenter', this.mouseenterCbIndex[charid]);
            this.mouseleaveCbIndex[charid] = () => { this.highlightMouseleft$.next(charid); };
            n.addEventListener('mouseleave', this.mouseleaveCbIndex[charid]);
        }
    }
    createHighlightCallback(charid) {
        return this.domNodes[charid];
    }
    /**
     * Disables the highlighting of the node with given charid
     * Extracts the DomNode from "domNodes" where the key matches charid.
     * - removes class for highlighting
     * - removes event listeners for click, mouseenter, mouseleave
     */
    unlightNode(charid) {
        const n = this.domNodes[charid];
        if (n) {
            this.renderer.removeClass(n, 'gv-quill-text-highlight');
            n.removeEventListener('click', this.clickCbIndex[charid]);
            n.removeEventListener('mouseenter', this.mouseenterCbIndex[charid]);
            n.removeEventListener('mouseleave', this.mouseleaveCbIndex[charid]);
        }
    }
    /**
     * Enables accent of the node with given charid
     * - adds class for accent
     */
    accentuateNode(charid) {
        const n = this.domNodes[charid];
        if (n) {
            this.renderer.addClass(n, 'gv-quill-text-accent');
        }
    }
    /**
     * Disables accent of the node with given charid
     * - removes class for accent
     */
    unaccentuateNode(charid) {
        const n = this.domNodes[charid];
        if (n) {
            this.renderer.removeClass(n, 'gv-quill-text-accent');
        }
    }
    batchInsertContent(dialogTitle, ops, done) {
        /**
         * Progress Dialog
         */
        const length = ops.length;
        const batchsize = 500;
        const iterations = length / batchsize;
        const done$ = new Subject();
        const value$ = new BehaviorSubject(0);
        let progDialog;
        let i = 0;
        const progDialogData = {
            title: dialogTitle,
            mode$: new BehaviorSubject('determinate'),
            value$
        };
        timer(200).pipe(takeUntil(done$)).subscribe(() => {
            progDialog = this.openProgressDialog(progDialogData);
        });
        const addBatch = () => {
            const start = i * batchsize;
            const end = start + batchsize;
            const nextDeltaChunk = ops.slice(start, end);
            // const nextDeltaChunk = remainingOps.splice(0, batchsize);
            const existingContentLength = this.quillEditor.getLength() - 1;
            if (i > 0)
                nextDeltaChunk.unshift({ retain: existingContentLength });
            this.quillEditor.updateContents(nextDeltaChunk, 'api');
            if (end <= length) {
                value$.next(Math.round(i / iterations * 100));
                setTimeout(() => {
                    addBatch();
                }, 0);
            }
            else {
                this.cleanupNewLine();
                done$.next(true);
                value$.next(1);
                if (progDialog)
                    progDialog.close();
                this.batchInsertingContent = false;
                this.updateComponent();
                if (done)
                    done();
            }
            i++;
        };
        addBatch();
    }
    openProgressDialog(data) {
        return this.dialog.open(ProgressDialogComponent, {
            width: '250px',
            data,
            // hasBackdrop: false,
            disableClose: true
        });
    }
    /**
     * cleanup the newline at end of document if second last element
     * is also a newline (having a blockid)
     */
    cleanupNewLine() {
        const ops = this.quillEditor.editor.delta.ops;
        if (ops.length > 1) {
            const last = ops[ops.length - 1];
            const secondLast = ops[ops.length - 2];
            if (last.insert === '\n' && !last.attributes &&
                secondLast.insert === '\n' && secondLast.attributes && secondLast.attributes.blockid) {
                this.quillEditor.deleteText((ops.length - 1), 1, 'api');
            }
        }
    }
};
QuillEditorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QuillEditorService);
export { QuillEditorService };
//# sourceMappingURL=quill-editor.service.js.map