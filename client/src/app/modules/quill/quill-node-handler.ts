import { Renderer2, EventEmitter } from "@angular/core";


export class QuillNodeHandler {

    onClick: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onMouseEnter: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onMouseLeave: EventEmitter<QuillNodeHandler> = new EventEmitter();
    onSelectedChange: EventEmitter<QuillNodeHandler> = new EventEmitter(); // emited when isSelected changed


    public readonly nodeId: string;
    public isSelected: boolean;

    constructor(
        private renderer: Renderer2,
        private node: any,
        public readonly annotatedEntitiesCount: number,
        public readonly annotationsVisible: boolean,
        public readonly creatingAnnotation: boolean
    ) {

        this.nodeId = node.attributes.quillnode.value;

        this.addClasses()

        this.addListeners()



    }

    private addClasses() {

        // make a 
        if (this.creatingAnnotation)
            this.setCreateAnnotationClass()

        // highlight mentioned entities
        else if (this.annotationsVisible)
            this.setAnnotatedEntitiesClass()

    }

    /**
     * calculates the backgound-color according to the mentionedEntitiesCount
     */
    private setAnnotatedEntitiesClass(): void {


        if (this.annotatedEntitiesCount > 0) {
            // add a background style
            this.renderer.addClass(this.node, 'bg-success');
        }

    }

    /**
     * calculates the backgound-color according to the mentionedEntitiesCount
     */
    private setCreateAnnotationClass(): void {

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

    private invertIsSelected(){
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