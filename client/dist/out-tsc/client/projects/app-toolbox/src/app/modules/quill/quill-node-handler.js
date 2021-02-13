import { EventEmitter } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { intersection } from 'ramda';
export class QuillNodeHandler {
    constructor(renderer, node, annotatedChunks$, // pk_entities (of chunks)
    annotationsVisible$, chunksToHighlight$, // array of pk_entities (of chunks) that are to be highlighted in the text
    creatingAnnotation) {
        this.renderer = renderer;
        this.node = node;
        this.annotatedChunks$ = annotatedChunks$;
        this.annotationsVisible$ = annotationsVisible$;
        this.chunksToHighlight$ = chunksToHighlight$;
        this.creatingAnnotation = creatingAnnotation;
        this.destroy$ = new Subject();
        this.onClick = new EventEmitter();
        this.onMouseEnter = new EventEmitter();
        this.onMouseLeave = new EventEmitter();
        this.onSelectedChange = new EventEmitter(); // emited when isSelected changed
        this.nodeId = node.attributes.charid.value;
        combineLatest(annotatedChunks$, annotationsVisible$, chunksToHighlight$).pipe(takeUntil(this.destroy$)).subscribe(d => {
            const annotatedChunks = d[0], annotationsVisible = d[1], chunksToHighlight = d[2];
            if (chunksToHighlight && annotatedChunks && intersection(annotatedChunks, chunksToHighlight).length) {
                // if an annotated entity is to highlight
                this.renderer.addClass(this.node, 'gv-bg-highlight-2');
                this.renderer.removeClass(this.node, 'gv-bg-highlight');
            }
            else if (annotationsVisible && annotatedChunks && annotatedChunks.length) {
                // if annotations are visible and there is at least one annotation
                this.renderer.addClass(this.node, 'gv-bg-highlight');
                this.renderer.removeClass(this.node, 'gv-bg-highlight-2');
            }
            else {
                this.renderer.removeClass(this.node, 'gv-bg-highlight');
                this.renderer.removeClass(this.node, 'gv-bg-highlight-2');
            }
        });
        this.addListeners();
    }
    destroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    /**
     * calculates the backgound-color according to the mentionedEntitiesCount
     */
    setCreateAnnotationClass() {
        // add a background style
        if (this.isSelected) {
            // this.renderer.removeClass(this.node, 'bg-light');
            this.renderer.addClass(this.node, 'bg-success');
        }
        else {
            this.renderer.removeClass(this.node, 'bg-success');
            // this.renderer.addClass(this.node, 'bg-light');
        }
    }
    invertIsSelected() {
        this.isSelected = !this.isSelected;
        this.setCreateAnnotationClass();
        this.onSelectedChange.emit(this);
    }
    addListeners() {
        // add click listener
        this.renderer.listen(this.node, 'click', () => {
            this.onClick.emit(this);
        });
        // add mouseenter listener
        this.renderer.listen(this.node, 'mouseenter', () => {
            this.onMouseEnter.emit(this);
        });
        // add mouseleave listener
        this.renderer.listen(this.node, 'mouseleave', () => {
            this.onMouseLeave.emit(this);
        });
        // if in creating-annotation mode
        if (this.creatingAnnotation) {
            // add click listener
            this.renderer.listen(this.node, 'mousedown', (event) => {
                this.invertIsSelected();
            });
            // add mouseenter listener
            this.renderer.listen(this.node, 'mouseenter', (event) => {
                if (event.buttons) {
                    this.invertIsSelected();
                }
            });
        }
    }
}
//# sourceMappingURL=quill-node-handler.js.map