import { Component, AfterViewInit, Input, ChangeDetectorRef, ViewChild, ElementRef, OnInit, EventEmitter, Output, OnChanges, AfterContentInit, Renderer2 } from '@angular/core';
import { QuillService } from '../quill.service';
import * as Delta from 'quill-delta/lib/delta';
import { QuillNodeHandler } from '../quill-node-handler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gv-quill-edit',
  templateUrl: './quill-edit.component.html',
  styleUrls: ['./quill-edit.component.scss']
})
export class QuillEditComponent implements OnInit {

  @Input() contents: Delta;
  @Input() latestId: number;

  @Input() set annotatedNodes(arr: [string, number][]) {
    this._annotatedNodes = new Map(arr);
  }
  private _annotatedNodes: Map<string, number>; // string: id of node, number intensity of highlight

  @Input() annotationsVisible: boolean;

  // if true, the editor is not content editable, but it emits a Delta with selected nodes
  @Input() creatingAnnotation: boolean;

  // needed for creating annotation: maps nodeid with object containing isSelected-boolean and op (from Delta.ops)
  nodeSelctionMap = new Map<string, { isSelected: boolean, op: any }>();


  @Output() contentChange: EventEmitter<any> = new EventEmitter()
  @Output() htmlChange: EventEmitter<string> = new EventEmitter()
  @Output() latestIdChange: EventEmitter<number> = new EventEmitter()
  @Output() selectedDeltaChange: EventEmitter<Delta> = new EventEmitter()

  // the selected Delta, when creating an annotation
  private selectedDelta: Delta;

  // the editor
  quillEditor: any;

  Quill;

  html: string;

  @ViewChild('editor') editorElem: ElementRef;

  constructor(
    private ref: ChangeDetectorRef,
    private quillService: QuillService,
    private renderer: Renderer2,
  ) {
    this.Quill = quillService.Quill;
  }

  ngOnInit() {
    if (this.latestId === undefined) {
      throw new Error('No latestId provided')
    }


    this.quillEditor = new this.Quill(this.editorElem.nativeElement, {
      theme: 'snow',
      readOnly: this.creatingAnnotation ? true : false
    });

    // register for text changes
    this.quillEditor.on('text-change', (delta, oldDelta, source) => {
      this.contentChanged(
        delta,
        oldDelta,
        source
      );
    });

    // set the initial contents
    this.quillEditor.setContents(this.contents);


    // create the nodeSelctionMap
    if (this.creatingAnnotation) {
      this.contents.ops.forEach(op => {
        if (op.attributes && op.attributes.node) {

          // add it to the nodeSelctionMap
          this.nodeSelctionMap.set(op.attributes.node, {
            isSelected: false,
            op
          })

        }
      });
    }

  }


  contentChanged(delta, oldDelta, source) {

    // if the user changed the content
    if (source == 'user') {
      console.log("A user action triggered this change.");

      const nodenizeResult = this.quillService.nodenizeContentChange(delta, oldDelta, this.latestId);

      this.latestId = nodenizeResult.latestId;

      this.latestIdChange.emit(this.latestId)

      this.quillEditor.updateContents(nodenizeResult.delta)

      this.updateComponent()

    }

  };


  /**
   * updates the components model
   */
  updateComponent() {
    // update html
    this.updateHtml()

    // updeate contents (json)
    this.updateContents();
  }

  updateHtml() {
    this.html = this.editorElem.nativeElement.children[0].innerHTML;
    if (this.html === '<p><br></p>') {
      this.html = null;
    }
    this.htmlChange.emit(this.html)
  };

  updateContents() {
    this.contents = this.quillEditor.getContents();
    this.contentChange.emit(this.contents)
  }


  nodeSubs = new Map<string, Subscription[]>(); // string=nodeid, subscriptions on this nodes events

  /**
   * called when QuillJs adds some nodes, i.e. when user edits the text
   * @param  
   */
  onDomChange($event: MutationRecord): void {
    // if added nodes
    if ($event.addedNodes.length) {
      var node = $event.addedNodes[0] as any;
      if (node.attributes && node.attributes.quillnode) {

        const id = node.attributes.quillnode.value;

        const annotatedEntitiesCount = this._annotatedNodes ? this._annotatedNodes.get(id) : 0;

        // 
        const qnh = new QuillNodeHandler(this.renderer, node, annotatedEntitiesCount, this.annotationsVisible, this.creatingAnnotation)

        // subscribe for events of nodehandler
        this.nodeSubs.set(id, [
          qnh.onClick.subscribe((nh: QuillNodeHandler) => {
            console.log({ click: nh })
          }),
          qnh.onSelectedChange.subscribe((nh: QuillNodeHandler) => {
            console.log({ onSelectedChange: nh })
            this.changeAnnotatedDelta(nh);
          }),
        ])


      }
    }

    // if removed nodes
    if ($event.removedNodes.length) {
      var node = $event.removedNodes[0] as any;
      if (node.attributes && node.attributes.quillnode) {
        const id = node.attributes.quillnode.value;

        // unsubscribe
        this.nodeSubs.get(id).forEach((sub: Subscription) => {
          sub.unsubscribe()
        });
      }
    }
  }


  changeAnnotatedDelta(qnh: QuillNodeHandler) {
    const isSelected = qnh.isSelected;
    const nodeId = qnh.nodeId;

    // change the is selected boolean
    let item = this.nodeSelctionMap.get(nodeId)
    item.isSelected = isSelected;

    // create new and empty selectedDelta
    this.selectedDelta = new Delta()

    // fill the selectedDelta with the selected items
    // or a ... node if some tokens are omitted
    let previousItem;
    this.nodeSelctionMap.forEach(item => {

      if (item.isSelected) {
        // add dots, if there is a previous item that is not selected
        if (
          this.selectedDelta.ops.length &&
          previousItem.isSelected === false
        ) {
          this.selectedDelta.ops.push({
            "attributes": {
              "node": "_dots_"
            },
            "insert": " … "
          })
        }

        this.selectedDelta.ops.push(item.op);

      }

      previousItem = item;
    })

    this.selectedDeltaChange.emit(this.selectedDelta)
  }

}
