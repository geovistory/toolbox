
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Delta from 'quill/node_modules/quill-delta';
import { clone, sum } from 'ramda';
import { combineLatest, merge, Observable, of, Subject, Subscription, timer, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressDialogComponent, ProgressDialogData, ProgressMode } from '../../../shared/components/progress-dialog/progress-dialog.component';
import { QuillNodeHandler } from '../quill-node-handler';
import { DeltaI, Ops, QuillDoc } from '../quill.models';
import { QuillService } from '../quill.service';

// the array of numbers are the pk_entities of the chunks
export interface IndexedCharids<M> { [charid: number]: M }
export type ChunksPks = number[]

@Component({
  selector: 'gv-quill-edit',
  templateUrl: './quill-edit.component.html',
  styleUrls: ['./quill-edit.component.scss'],
  providers: [
    QuillService
  ]
})
export class QuillEditComponent implements OnInit, OnChanges, OnDestroy {

  destroy$ = new Subject<boolean>();

  // the Data containing a standard jsQuill-Delta object and a latestId
  @Input() quillDoc: QuillDoc;

  // If true, the editor is not content editable
  @Input() readOnly: boolean;

  // If true, the editor is not content editable, but it emits a Delta with selected nodes
  @Input() creatingAnnotation: boolean;

  // Editor Config object. If none provided, it will use a default.
  @Input() editorConfig: any;

  @Input() annotationsVisible$: Observable<boolean>;
  _annotationsVisible$: Observable<boolean>;

  @Input() annotatedNodes$: Observable<IndexedCharids<number[]>>;
  _highlightedNodes: Observable<IndexedCharids<number[]>>;

  @Input() accentuatedNodes$: Observable<IndexedCharids<true>>;
  _accentuatedNodes$: Observable<IndexedCharids<true>>

  // Max number of characters
  @Input() maxLength = 30000;

  @Output() quillDocChange = new EventEmitter<QuillDoc>()
  @Output() blur = new EventEmitter<void>()
  @Output() focus = new EventEmitter<void>()
  @Output() textLengthChange = new EventEmitter<number>()
  @Output() htmlChange = new EventEmitter<string>()
  @Output() selectedDeltaChange = new EventEmitter<Delta>()
  @Output() nodeClick = new EventEmitter<number[]>()
  @Output() nodeMouseenter = new EventEmitter<number[]>()
  @Output() nodeMouseleave = new EventEmitter<number[]>()


  // needed for creating annotation: maps nodeid with object containing isSelected-boolean and op (from Delta.ops)
  private nodeSelctionMap = new Map<string, { isSelected: boolean, op: any }>();

  // the selected Ops, when creating an annotation
  private selectedDelta: DeltaI;

  // the editor object
  quillEditor: any;

  // flag to prevent updating
  initializingContent = true;

  // The Operations object
  private ops: Ops;

  private html: string;

  showTokenIds = false;

  // if false, the toolbar defined in html will be hidden
  showDefaultToolbar = true;

  @ViewChild('editor', { static: true }) editorElem: ElementRef;
  @ViewChild('toolbar', { static: true }) toolbar: ElementRef;

  // Add styling and behavior of an Input element
  @HostBinding('class.gv-quill-input-like') @Input() inputLike = false;

  // Add styling and behavior of an Input element
  @HostBinding('class.gv-quill-mat-input-like') @Input() matInputLike = false;

  // Add styling and behavior of an Input element
  @HostBinding('class.gv-quill-textarea-like') @Input() textareaLike = false;

  // Array of event handlers where key is name of event, and value is the hanlder
  // Needed for calling .off(...) on destroy (https://quilljs.com/docs/api/#off)
  eventHandlers: { name: string; handler: any }[] = []

  constructor(
    private quillService: QuillService,
    public dialog: MatDialog
  ) { }

  /**
   * It is possible to change the input:
   * - quillDoc
   * - readOnly
   * - creatingAnnotation
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

    // init the editor
    this.initEditor();

    // register for text changes
    this.registerOnTextChange();

    // register for selection changes
    this.registerOnSelectionChange();

    // init contents
    this.initContents();

    // init highlighting
    this.initHighlighting()

    // init clipboard (copy & paste)
    this.initClipboard()

  }


  addHandler(name: string, handler) {
    this.quillEditor.on(name, handler)
    this.eventHandlers.push({ name, handler })
  }

  private registerOnTextChange() {
    this.addHandler('text-change', (delta, oldDelta, source) => {
      this.contentChanged(delta, oldDelta, source);
      this.textLengthChange.emit((this.quillEditor.getLength() - 1))
    })
  }

  private registerOnSelectionChange() {

    this.addHandler('selection-change', (range, oldRange, source) => {
      if (range) {
        this.focus.emit()

        if (range.length == 0) {

          // console.log('User cursor is on', range.index);
          this.selectedDeltaChange.emit(null);
        } else {
          const delta = this.getChunkOfSelectedRange(range);
          this.selectedDeltaChange.emit(delta);
        }
      } else {
        this.blur.emit()

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




  private initEditor() {
    const cb = () => {
      this.updateComponent()
    }
    this.quillEditor = this.quillService.createEditor(this.editorElem.nativeElement, this.editorConfig, cb, this.maxLength);
  }

  private initEditorConfig() {
    // set default editor config
    const enterHandler = this.quillService.createEnterHandle()
    const defaultEditorConfig = {
      theme: 'snow',
      modules: {
        toolbar: this.toolbar.nativeElement,
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter', // Enter Key
              shiftKey: null,
              handler: enterHandler
            }
          }
        }
      },
      // See list of formats: https://quilljs.com/docs/formats/
      formats: [
        // Inline formats
        // 'highlight',
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
        ops: []
      };
    this.quillService.latestId = this.quillDoc.latestId;
    this.ops = this.quillDoc.ops;
  }

  /**
   * Compares a QuillDoc with this.contents and this.quillService.latestId
   *
   * If the given quillDoc is different then the one from the component
   * returns true, else false.
   * @param qd
   */
  private quillDocIsDifferent(qd: QuillDoc) {
    if (this.quillService.latestId !== qd.latestId || this.ops !== qd.ops || this.ops.length !== qd.ops.length) return true;
    else return false;
  }

  private validateInputs() {
    if (this.quillService.latestId < 0) {
      throw new Error('LatestId must be 0 or higher');
    }
    if (this.inputLike && this.textareaLike) {
      throw new Error('Quill-Edit-Component: you can\'t set [inputLike] and [textareaLike] true. They are mutually exclusive.');
    }
  }

  private initContents() {
    this.initializingContent = true;
    const length = this.ops.length;

    // Make sure previous content is deleted
    if (length === 0) {
      this.quillEditor.setContents([{ insert: '\n', }
      ], 'api');
    } else {
      this.quillEditor.setContents([], 'api')
    }
    // Clear histroy to prevent user from going back (e.g. to previous version)
    this.quillEditor.history.clear();


    /**
     * Progress Dialog
     */
    const batchsize = 500;
    const iterations = length / batchsize;
    const done$ = new Subject();
    const value$ = new BehaviorSubject(0);

    let progDialog;
    let i = 0;
    const progDialogData: ProgressDialogData = {
      title: 'Opening Document',
      mode$: new BehaviorSubject<ProgressMode>('determinate'),
      value$
    }

    timer(200).pipe(takeUntil(done$)).subscribe(() => {
      progDialog = this.openProgressDialog(progDialogData)
    })

    const addBatch = () => {
      const start = i * batchsize;
      const end = start + batchsize;
      const nextDeltaChunk = this.ops.slice(start, end)
      i++;
      // const nextDeltaChunk = remainingOps.splice(0, batchsize);
      const existingContentLength = this.quillEditor.getLength() - 1;
      if (existingContentLength > 0) nextDeltaChunk.unshift({ retain: existingContentLength })
      this.quillEditor.updateContents(nextDeltaChunk, 'api');
      if (end <= length) {
        value$.next(Math.round(i / iterations * 100))
        setTimeout(() => {
          addBatch();
        }, 0)
      } else {
        this.cleanupNewLine()

        done$.next(true)
        value$.next(1)
        if (progDialog) progDialog.close();
        this.initializingContent = false;
        this.updateComponent()
      }
    }
    addBatch()



  }

  /**
   * cleanup the newline at end of document if second last element
   * is also a newline (having a blockid)
   */
  cleanupNewLine() {
    const ops: Ops = this.quillEditor.editor.delta.ops;
    if (ops.length > 1) {
      const last = ops[ops.length - 1]
      const secondLast = ops[ops.length - 2]

      if (
        last.insert === '\n' && !last.attributes &&
        secondLast.insert === '\n' && secondLast.attributes && secondLast.attributes.blockid
      ) {
        this.quillEditor.deleteText((ops.length - 1), 1, 'api')
      }
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
  }

  /**
   * Initializes highlighting mechanism
   *
   * @param highlightNodes$ is observable indexOps where keys are charid's, that should be highlighted.
   * @param showHighlight$ is observable boolean used to toggle highlighing.
   */
  initHighlighting() {
    let highlighted: IndexedCharids<number[]> = {}
    let accentuated: IndexedCharids<true> = {}

    // Pass the values of annotationsVisible$ to _annotationsVisible$
    this._annotationsVisible$ = merge((this.annotationsVisible$ || of(false)))

    // Pass the values of annotatedNodes$ to _annotatedNodes$
    this._highlightedNodes = merge((this.annotatedNodes$ || of({})))

    // Pass the values of accentuatedNodes$ to _accentuatedNodes$
    this._accentuatedNodes$ = merge((this.accentuatedNodes$ || of([])))

    /**
     * Manage highlighting and mouse event registration
     */
    combineLatest([this._annotationsVisible$, this._highlightedNodes]).pipe(takeUntil(this.destroy$))
      .subscribe(([show, newHighlighted]) => {
        if (show) {
          const oldHighlighted = clone(highlighted)

          // if annotationsVisible is true, enable highlighting
          for (const charid in newHighlighted) {
            // if new highlightNode
            if (newHighlighted.hasOwnProperty(charid)) {
              if (!highlighted.hasOwnProperty(charid)) {
                // enable highlighting for this new node
                this.quillService.highlightNode(parseInt(charid, 10))
              }
              // remove from old nodes so that the remaining nodes are the deleted nodes
              delete oldHighlighted[charid]
            }

          }

          // for all remaining nodes, i.e. the removed nodes
          for (const charid in oldHighlighted) {
            // disable their highlighting
            if (oldHighlighted.hasOwnProperty(charid)) {
              this.quillService.unlightNode(parseInt(charid, 10));
            }
          }
          highlighted = newHighlighted;

        } else {
          // if annotationsVisible is false, disable highlighting
          for (const charid in highlighted) {
            if (highlighted.hasOwnProperty(charid)) {
              this.quillService.unlightNode(parseInt(charid, 10))
            }
          }
          highlighted = {}
        }
      })

    /**
     * Manage accentuation
     */
    this._accentuatedNodes$.pipe(takeUntil(this.destroy$))
      .subscribe(newAccentuated => {
        const oldAccentuated = clone(accentuated)

        // if annotationsVisible is true, enable accent
        for (const charid in newAccentuated) {
          // if new accentuateNode
          if (newAccentuated.hasOwnProperty(charid)) {
            if (!accentuated.hasOwnProperty(charid)) {
              // enable accent for this new node
              this.quillService.accentuateNode(parseInt(charid, 10))
            }
            // remove from old nodes so that the remaining nodes are the deleted nodes
            delete oldAccentuated[charid]
          }

        }

        // for all remaining nodes, i.e. the removed nodes
        for (const charid in oldAccentuated) {
          // disable their accent
          if (oldAccentuated.hasOwnProperty(charid)) {
            this.quillService.unaccentuateNode(parseInt(charid, 10));
          }
        }
        accentuated = newAccentuated;
      })

    // Subscribe to dom events triggerd by the highlighted nodes
    this.quillService.highlightClicked$.pipe(takeUntil(this.destroy$)).subscribe((charid) => {
      this.nodeClick.emit(highlighted[charid])
    })
    this.quillService.highlightMouseentered$.pipe(takeUntil(this.destroy$)).subscribe((charid) => {
      this.nodeMouseenter.emit(highlighted[charid])
    })
    this.quillService.highlightMouseleft$.pipe(takeUntil(this.destroy$)).subscribe((charid) => {
      this.nodeMouseleave.emit(highlighted[charid])
    })
  }


  initClipboard() {
    // this.quillEditor.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
    // const d = new Delta();



    //   return d
    // });

    this.quillEditor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta: Delta): Delta => {
      const d = new Delta();
      if (delta.ops.length > 0) {
        for (let index = 0; index < delta.ops.length; index++) {
          const op = delta.ops[index];
          if (op.insert && typeof op.insert === 'string') {
            for (let i = 0; i < op.insert.length; i++) {
              const char = op.insert.charAt(i);
              if (char !== '\n') {
                d.insert(char, { ...op.attributes, charid: ++this.quillService.latestId });
              } else {
                d.insert(char, { ...op.attributes, blockid: ++this.quillService.latestId })
              }
            }
          } else {
            d.ops.push(op)
          }
        }
      }
      return d;
    });
  }


  contentChanged(delta, oldDelta, source) {

    let updateComponent = true;


    if (
      delta.ops &&
      delta.ops.length < 5 // exclude large deltas from copy & paste
    ) {
      const inserts = delta.ops.filter(op => !!op.insert);
      if (inserts.length === 1 && inserts[0].insert) {
        const insertOp = inserts[0];


        // is this a new character ?
        if (insertOp.insert !== '\n' &&
          (!insertOp.attributes || !insertOp.attributes.charid
            || insertOp.attributes.charid < this.quillService.latestId
          )
        ) {
          // Add charid if needed
          updateComponent = false
          const retainOp = delta.ops.find(op => !!op.retain);
          const retain = retainOp ? retainOp.retain : 0;
          this.quillEditor.formatText((retain), 1, { charid: ++this.quillService.latestId }, 'api')
        }
        // is this a new line break ?
        else if (insertOp.insert === '\n' &&
          (!insertOp.attributes || !insertOp.attributes.blockid
            || insertOp.attributes.blockid <= this.quillService.latestId
          )
        ) {
          // Add blockid if needed
          updateComponent = false
          const retain = sum(delta.ops.map(op => op.retain || 0));
          let index, blockid;

          if (
            this.quillService.editor.getLength() > 1
          ) {
            index = retain + 1;
          } else {
            index = retain;
          }
          // exceptional case that the retain is bigger because of line formatting of block
          // TODO: find a way this works also, if ops[retain - 1] is a character,
          if (this.quillEditor.editor.delta.ops[retain - 1] &&
            this.quillEditor.editor.delta.ops[retain - 1].attributes &&
            insertOp.attributes &&
            insertOp.attributes.blockid &&
            this.quillEditor.editor.delta.ops[retain - 1].attributes.blockid === insertOp.attributes.blockid
          ) {
            index = retain;
          }

          if (this.quillService.editor.getLength() > 1) {
            blockid = ++this.quillService.latestId;
          } else {
            blockid = this.quillService.latestId;
          }
          this.quillEditor.formatText((index), 1, { blockid }, 'api')
        }
      }
    }

    const length = this.quillEditor.editor.delta.ops.length - 1;
    if (length > this.maxLength) {
      this.quillEditor.history.undo()
    }

    if (updateComponent && !this.initializingContent) this.updateComponent()

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
      latestId: this.quillService.latestId,
      ops: this.ops
    }
    this.quillDocChange.emit(this.quillDoc)
  }




  changeAnnotatedDelta(qnh: QuillNodeHandler) {
    const isSelected = qnh.isSelected;
    const nodeId = qnh.nodeId;

    // change the is selected boolean
    const item = this.nodeSelctionMap.get(nodeId)
    item.isSelected = isSelected;

    // create new and empty selectedDelta
    this.selectedDelta = new Delta()

    // fill the selectedDelta with the selected items
    // or a ... node if some tokens are omitted
    let previousItem;
    this.nodeSelctionMap.forEach(i => {

      if (i.isSelected) {
        // add dots, if there is a previous i that is not selected
        if (
          this.selectedDelta.ops.length &&
          previousItem.isSelected === false
        ) {
          this.selectedDelta.ops.push({
            'attributes': {
              'node': '_'
            },
            'insert': ' … '
          })
        }

        this.selectedDelta.ops.push(i.op);

      }

      previousItem = i;
    })

    this.selectedDeltaChange.emit(this.selectedDelta)
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

  ngOnDestroy() {
    this.eventHandlers.forEach(d => {
      this.quillEditor.off(d.name, d.handler)
    })
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
