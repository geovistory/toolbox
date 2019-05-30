import { Renderer2, EventEmitter } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { intersection } from 'ramda';


export class QuillNodeHandler {

    destroy$ = new Subject<boolean>();

    onClick: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onMouseEnter: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onMouseLeave: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onSelectedChange: EventEmitter<QuillNodeHandler> = new EventEmitter(); // emited when isSelected changed


    public readonly nodeId: string;
    public isSelected: boolean;

    constructor(
        private renderer: Renderer2,
        private node: any,
        public readonly annotatedChunks$: Observable<number[]>, // pk_entities (of chunks)
        public readonly annotationsVisible$: Observable<boolean>,
        public readonly chunksToHighlight$: Observable<number[]>, // array of pk_entities (of chunks) that are to be highlighted in the text
        public readonly creatingAnnotation: boolean
    ) {

        this.nodeId = node.attributes.charid.value;

        combineLatest(annotatedChunks$, annotationsVisible$, chunksToHighlight$).pipe(takeUntil(this.destroy$)).subscribe(d => {

            const annotatedChunks = d[0], annotationsVisible = d[1], chunksToHighlight = d[2];

            if (chunksToHighlight && annotatedChunks && intersection(annotatedChunks, chunksToHighlight).length) {
                // if an annotated entity is to highlight

                this.renderer.addClass(this.node, 'gv-bg-highlight-2');
                this.renderer.removeClass(this.node, 'gv-bg-highlight');

            } else if (annotationsVisible && annotatedChunks && annotatedChunks.length ) {
                // if annotations are visible and there is at least one annotation
                this.renderer.addClass(this.node, 'gv-bg-highlight');
                this.renderer.removeClass(this.node, 'gv-bg-highlight-2');
            } else {

                this.renderer.removeClass(this.node, 'gv-bg-highlight');
                this.renderer.removeClass(this.node, 'gv-bg-highlight-2');
            }

        })

        this.addListeners()

    }

    public destroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }



    /**
     * calculates the backgound-color according to the mentionedEntitiesCount
     */
    private setCreateAnnotationClass(): void {

        // add a background style
        if (this.isSelected) {
            // this.renderer.removeClass(this.node, 'bg-light');
            this.renderer.addClass(this.node, 'bg-success');
        } else {
            this.renderer.removeClass(this.node, 'bg-success');
            // this.renderer.addClass(this.node, 'bg-light');
        }

    }

    private invertIsSelected() {
        this.isSelected = !this.isSelected;

        this.setCreateAnnotationClass()

        this.onSelectedChange.emit(this)
    }


    private addListeners() {

        // add click listener
        this.renderer.listen(this.node, 'click', () => {
            this.onClick.emit(this)
        })

        // add mouseenter listener
        this.renderer.listen(this.node, 'mouseenter', () => {
            this.onMouseEnter.emit(this)
        })

        // add mouseleave listener
        this.renderer.listen(this.node, 'mouseleave', () => {
            this.onMouseLeave.emit(this)
        })


        // if in creating-annotation mode
        if (this.creatingAnnotation) {
            // add click listener
            this.renderer.listen(this.node, 'mousedown', (event) => {

                this.invertIsSelected();

            })

            // add mouseenter listener
            this.renderer.listen(this.node, 'mouseenter', (event: MouseEvent) => {

                if (event.buttons) {

                    this.invertIsSelected();

                }

            })
        }
    }

}
