import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import Delta from 'quill/node_modules/quill-delta';
import { asyncScheduler, BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { distinct, filter, map, takeUntil, tap } from 'rxjs/operators';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from '../../../shared/components/progress-dialog/progress-dialog.component';
import { QuillNodeHandler } from '../quill-node-handler';
import { DeltaI, Ops, QuillDoc } from '../quill.models';
import { QuillService } from '../quill.service';

@Component({
  selector: 'gv-quill-edit',
  templateUrl: './quill-edit.component.html',
  styleUrls: ['./quill-edit.component.scss']
})
export class QuillEditComponent implements OnInit, OnChanges {

  // the Data containing a standard jsQuill-Delta object and a latestId
  @Input() quillDoc: QuillDoc;

  // If true, the editor is not content editable
  @Input() readOnly: boolean;

  // If true, the editor is not content editable, but it emits a Delta with selected nodes
  @Input() creatingAnnotation: boolean;

  // Editor Config object. If none provided, it will use a default.
  @Input() editorConfig: any;

  @Input() annotationsVisible$: Observable<boolean>;

  @Input() annotatedNodes$: Observable<{ [nodeId: string]: number[] }>;

  @Input() entitiesToHighlight$: Observable<number[]>

  @Output() quillDocChange = new EventEmitter<QuillDoc>()
  @Output() blur = new EventEmitter<void>()
  @Output() htmlChange = new EventEmitter<string>()
  @Output() selectedDeltaChange = new EventEmitter<Delta>()
  @Output() nodeClick = new EventEmitter<QuillNodeHandler>()


  // needed for creating annotation: maps nodeid with object containing isSelected-boolean and op (from Delta.ops)
  private nodeSelctionMap = new Map<string, { isSelected: boolean, op: any }>();

  // the selected Ops, when creating an annotation
  private selectedOps: DeltaI;

  // the editor object
  quillEditor: any;

  private Quill;

  // Next node inerted will get id = latestId + 1
  private latestId: number;

  // The Operations object
  private ops: Ops;

  private html: string;

  private nodeSubs = new Map<Node, { nh: QuillNodeHandler, subs: Subscription[] }>(); // the DOM Node, subscriptions on this nodes events

  private showTokenIds = false;

  // if false, the toolbar defined in html will be hidden
  private showDefaultToolbar = true;

  @ViewChild('editor') editorElem: ElementRef;
  @ViewChild('toolbar') toolbar: ElementRef;

  // Add styling and behavior of an Input element
  @HostBinding('class.gv-quill-input-like') @Input() inputLike = false;

  // Add styling and behavior of an Input element
  @HostBinding('class.gv-quill-textarea-like') @Input() textareaLike = false;

  constructor(
    private ref: ChangeDetectorRef,
    private quillService: QuillService,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.Quill = quillService.Quill;
  }

  /**
   * It is possible to change the input:
   * - quillDoc
   *
   * All other inputs have to be there on init
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {

    // Listen to changes of the input quillDoc
    const quillDocChange = changes['quillDoc'];
    if (
      quillDocChange && !quillDocChange.firstChange &&
      this.quillDocIsDifferent(quillDocChange.currentValue)
    ) {
      this.validateInputs();
      this.initQuillDoc();
      // this.initNodeSubscriptions();
      this.initContents();
    }

    // Listen to changes of the input readOnly
    const readOnly = changes['readOnly'];
    if (readOnly && !readOnly.firstChange) {
      if (readOnly.currentValue) this.quillEditor.disable()
      else this.quillEditor.enable()
    }

    // Listen to changes of the input creatingAnnotation
    const creatingAnnotation = changes['creatingAnnotation'];
    if (creatingAnnotation && !creatingAnnotation.firstChange) {
      if (creatingAnnotation.currentValue) this.quillEditor.disable()
      else this.quillEditor.enable()
      this.initContents();
    }

  }

  ngOnInit() {

    // init quillDoc
    this.initQuillDoc();

    // validate @Input() values
    this.validateInputs();

    // init editor config (https://quilljs.com/docs/configuration/)
    this.initEditorConfig();

    // init node handlers, e.g. to register click event on a node
    // this.initNodeSubscriptions();

    // init the editor
    this.initEditor();

    // register on blur handling
    this.registerOnBlur()

    // register for text changes
    this.registerOnTextChange();

    // register for selection changes
    this.registerOnSelectionChange();

    // init contents
    this.initContents();

  }



  private registerOnSelectionChange() {

    this.quillEditor.on('selection-change', (range, oldRange, source) => {
      if (range) {
        if (range.length == 0) {
          // console.log('User cursor is on', range.index);
          this.selectedDeltaChange.emit(null);
        } else {
          const delta = this.getChunkOfSelectedRange(range);
          this.selectedDeltaChange.emit(delta);
        }
      } else {
        // console.log('Cursor not in the editor');
        this.selectedDeltaChange.emit(null);

      }
    });
  }

  private getChunkOfSelectedRange(range: any) {
    const firstBlotOfSelection = this.quillEditor.getLeaf(range.index);
    const missingFromStart = firstBlotOfSelection[1] === (firstBlotOfSelection[0].text || []).length ? 0 : firstBlotOfSelection[1];
    const startIndex = range.index - missingFromStart;

    const lastBlotOfSelection = this.quillEditor.getLeaf((range.index + range.length));
    const missingTillEnd = (lastBlotOfSelection[0].text || []).length - lastBlotOfSelection[1];
    const offset = range.length + missingTillEnd + missingFromStart;

    const ops = this.quillEditor.getContents(startIndex, offset);
    return ops;
  }

  private registerOnTextChange() {
    this.quillEditor.on('text-change', (delta, oldDelta, source) => {
      this.contentChanged(delta, oldDelta, source);
    });
  }

  private initEditor() {
    this.quillEditor = new this.Quill(this.editorElem.nativeElement, this.editorConfig);
  }

  // private initNodeSubscriptions() {

  //   // unsubscribe from node subscriptions
  //   this.nodeSubs.forEach(node => {
  //     node.subs.forEach((sub: Subscription) => {
  //       sub.unsubscribe();
  //     });
  //     node.nh.destroy()
  //   });
  //   // reset nodeSubs
  //   this.nodeSubs = new Map<Node, { nh: QuillNodeHandler, subs: Subscription[] }>()
  // }

  private initEditorConfig() {
    // set default editor config
    const defaultEditorConfig = {
      theme: 'snow',
      modules: {
        toolbar: this.toolbar.nativeElement
      },
      // See list of formats: https://quilljs.com/docs/formats/
      formats: [
        // Inline formats
        'charid',
        'bold', 'italic', 'link', 'size', 'strike', 'underline',
        // Block formats
        'blockid',
        'header', 'indent', 'list', 'align',
      ]
    };
    // initialize default config
    this.editorConfig = {
      ...this.editorConfig,
      ...defaultEditorConfig
      // formats: (this.editorConfig && this.editorConfig.formats) ? this.editorConfig.formats : defaultEditorConfig.formats
    }

    // initialize config for readonly
    this.editorConfig = {
      ...this.editorConfig,
      readOnly: (this.creatingAnnotation || this.readOnly) ? true : false
    };

    // initialize config for look and feel of conventional input element
    if (this.inputLike) {
      this.initInputLike();
    }
    // initialize config for look and feel of conventional textarea element
    if (this.textareaLike) {
      this.initTextareaLike();
    }

    // hide the toolbar defined in html, if not needed
    if (defaultEditorConfig.modules.toolbar !== ((this.editorConfig || {}).modules || {}).toolbar) {
      this.showDefaultToolbar = false;
    }

    return defaultEditorConfig;
  }

  private initQuillDoc() {
    this.quillDoc = (this.quillDoc && 'latestId' in this.quillDoc && 'ops' in this.quillDoc && this.quillDoc.ops.length) ?
      this.quillDoc : {
        latestId: 1,
        ops: [{
          attributes: { blockid: 1 },
          insert: "\n"
        }]
      };
    this.latestId = this.quillDoc.latestId;
    this.ops = this.quillDoc.ops;
  }

  /**
   * Compares a QuillDoc with this.contents and this.latestId
   *
   * If the given quillDoc is different then the one from the component
   * returns true, else false.
   * @param qd
   */
  private quillDocIsDifferent(qd: QuillDoc) {
    if (this.latestId !== qd.latestId || this.ops !== qd.ops) return true;
    else return false;
  }

  private validateInputs() {
    if (this.latestId < 0) {
      throw new Error('LatestId must be 0 or higher');
    }
    if (this.inputLike && this.textareaLike) {
      throw new Error('Quill-Edit-Component: you can\'t set [inputLike] and [textareaLike] true. They are mutually exclusive.');
    }
  }

  private initContents() {

    // set the initial contents
    // if (this.ops && this.ops.length > 0) {

    this.quillEditor.setContents(this.ops);

    // } else {
    //   this.latestId = this.latestId + 1;
    //   this.quillEditor.setContents([{
    //     attributes: { id: this.latestId },
    //     insert: "\n"
    //   }])
    // }


    // create the nodeSelctionMap
    if (this.creatingAnnotation) {
      this.ops.forEach(op => {
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

  /**
   * Init so that it lools like <input type="text"/> element.
   * Quill editor will look and feel almost like a convetional input
   */
  initInputLike() {
    // styling
    this.editorConfig.theme = 'bubble';
    // disable all formatting (no bold, italic etc.)
    this.editorConfig.formats = ['charid', 'blockid'];
    // disable tabs and linebreak keys
    this.editorConfig['modules'] = {
      ...this.editorConfig['modules'],
      keyboard: {
        bindings: {
          tab: {
            key: 9, // Tab Key
            handler: function () {
            }
          },
          enter: {
            key: 13, // Enter Key
            handler: function () {
            }
          }
        }
      }
    }
  }


  /**
   * Init so that it lools like <textarea> element.
   * Quill editor will look and feel almost like a convetional input
   */
  initTextareaLike() {
    // styling
    this.editorConfig.theme = 'bubble';
    // disable all formatting (no bold, italic etc.)
    this.editorConfig.formats = ['charid', 'blockid'];
    // // disable tabs and linebreak keys
    // this.editorConfig['modules'] = {
    //   ...this.editorConfig['modules'],
    //   keyboard: {
    //     bindings: {
    //       tab: {
    //         key: 9, // Tab Key
    //         handler: function () {
    //         }
    //       },
    //       enter: {
    //         key: 13, // Enter Key
    //         handler: function () {
    //         }
    //       }
    //     }
    //   }
    // }
  }

  contentChanged(delta, oldDelta, source) {

    // if the user changed the content
    if (source == 'user') {
      console.log('A user action triggered this change.');


      asyncScheduler.schedule(() => {

        const feedback = this.quillService.characterizeContentChange(delta, oldDelta, this.latestId);

        const progDialogData: ProgressDialogData = {
          title: 'Processing entered text',
          mode$: new BehaviorSubject<ProgressMode>('determinate'),
          value$: new BehaviorSubject(0)
        }
        let progDialog;
        const done$ = feedback.progress.pipe(filter(p => p === 1), map(() => true))
        timer(20).pipe(takeUntil(done$)).subscribe(() => {
          progDialog = this.openProgressDialog(progDialogData)
        })

        feedback.progress.pipe(
          map(n => Math.round(n * 100)),
          distinct()
        ).subscribe(percent => {
          progDialogData.value$.next(percent)
          // console.log('progress', percent)
        })


        feedback.result.pipe(
          tap(() => {
            progDialogData.mode$.next('indeterminate')
          })
        ).subscribe(res => {

          const nodenizeResult = res;

          this.latestId = nodenizeResult.latestId;

          this.quillEditor.updateContents(nodenizeResult.delta)

          this.updateComponent()

          if (progDialog) progDialog.close()

        })
      })

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
    this.ops = this.quillEditor.getContents().ops;
    this.quillDoc = {
      latestId: this.latestId,
      ops: this.ops
    }
    this.quillDocChange.emit(this.quillDoc)
  }


  /**
   * called when QuillJs adds some nodes, i.e. when user edits the text
   * @param
   */
  onDomChange($event: MutationRecord): void {
    // if added nodes
    if ($event.addedNodes.length) {
      const node = $event.addedNodes[0] as any;
      if (node.attributes && node.attributes.charid) {

        if (!this.nodeSubs.has(node)) {

          const id = node.attributes.charid.value;

          const annotatedEntities$ = this.annotatedNodes$ ? this.annotatedNodes$.map(nodes => nodes[id]) : Observable.of(null);

          const qnh = new QuillNodeHandler(this.renderer, node, annotatedEntities$, this.annotationsVisible$, this.entitiesToHighlight$, this.creatingAnnotation)

          // subscribe for events of nodehandler
          this.nodeSubs.set(node, {
            nh: qnh,
            subs: [
              qnh.onClick.subscribe((nh: QuillNodeHandler) => {
                this.nodeClick.emit(qnh)
                console.log({ click: nh })
              }),
              qnh.onSelectedChange.subscribe((nh: QuillNodeHandler) => {
                console.log({ onSelectedChange: nh })
                this.changeAnnotatedDelta(nh);
              }),
            ]
          })
        }

      }
    }

    // if removed nodes
    if ($event.removedNodes.length) {
      const node = $event.removedNodes[0] as any;
      if (node.attributes && node.attributes.charid) {
        const id = node.attributes.charid.value;

        if (
          this.nodeSubs.has(node) &&
          !node.offsetParent // this is a hacky way to find out if the node has really been removed
        ) {
          // unsubscribe
          const nodeSub = this.nodeSubs.get(node);
          nodeSub.subs.forEach((sub: Subscription) => {
            sub.unsubscribe()
          });
          nodeSub.nh.destroy();

          // delete nodeSub
          this.nodeSubs.delete(node);
        }
      }
    }
  }

  // registers the on blur method
  registerOnBlur() {
    this.editorElem.nativeElement.firstChild.onblur = () => {
      this.onBlur();
    }
  }

  onBlur() {
    this.blur.emit()
  }


  changeAnnotatedDelta(qnh: QuillNodeHandler) {
    const isSelected = qnh.isSelected;
    const nodeId = qnh.nodeId;

    // change the is selected boolean
    const item = this.nodeSelctionMap.get(nodeId)
    item.isSelected = isSelected;

    // create new and empty selectedDelta
    this.selectedOps = new Delta()

    // fill the selectedDelta with the selected items
    // or a ... node if some tokens are omitted
    let previousItem;
    this.nodeSelctionMap.forEach(i => {

      if (i.isSelected) {
        // add dots, if there is a previous i that is not selected
        if (
          this.selectedOps.ops.length &&
          previousItem.isSelected === false
        ) {
          this.selectedOps.ops.push({
            'attributes': {
              'node': '_'
            },
            'insert': ' … '
          })
        }

        this.selectedOps.ops.push(i.op);

      }

      previousItem = i;
    })

    this.selectedDeltaChange.emit(this.selectedOps)
  }


  toggleShowTokenIds() {
    this.showTokenIds = !this.showTokenIds;
  }

  openProgressDialog(data: ProgressDialogData) {
    return this.dialog.open(ProgressDialogComponent, {
      width: '250px',
      data,
      // hasBackdrop: false,
      disableClose: true
    });
  }

}
