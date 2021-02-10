import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { IndexedCharids } from '../quill-edit/quill-edit.component';
import { Subject, Observable, BehaviorSubject, timer } from 'rxjs';
import { QuillService } from '../quill.service';
import { QuillEditorRegistryService } from './quill-editor-registry.service';
import { MatDialog } from '@angular/material';
import { ProgressDialogData, ProgressDialogComponent, ProgressMode } from 'projects/toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { Ops } from '..';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuillEditorService {

  // index of nodes, where key = charid, value = Node
  domNodes: { [key: number]: Node } = {};

  // index of nodes, where key = charid, value = array of numbers (e.g. pk_entity of chunks)
  highlightNodes: IndexedCharids<number[]> = {};

  // index of click Callbacks, needed for removing eventListeners
  clickCbIndex: { [key: number]: () => void } = {}

  // index of mouseenter Callbacks, needed for removing eventListeners
  mouseenterCbIndex: { [key: number]: () => void } = {}

  // index of mouseleave Callbacks, needed for removing eventListeners
  mouseleaveCbIndex: { [key: number]: () => void } = {}

  // emits the charid of the clicked highlighted node
  highlightClicked$ = new Subject<number>();

  // emits the charid of the mouseentered highlighted node
  highlightMouseentered$ = new Subject<number>();

  // emits the charid of the mouseleft highlighted node
  highlightMouseleft$ = new Subject<number>();

  // max number of characters allowed in text
  maxLength = Number.POSITIVE_INFINITY;

  // flag to prevent updating of content
  batchInsertingContent = true;

  containerBlot;
  quillEditor;
  latestId: number;
  updateComponent: () => void;
  private renderer: Renderer2

  constructor(
    private quillService: QuillService,
    private quillEditorRegistry: QuillEditorRegistryService,
    rendererFactory: RendererFactory2,
    public dialog: MatDialog
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  createEditor = (el, editorConfig, updateComponent, maxLength, destroy$: Observable<boolean>) => {
    this.maxLength = maxLength
    this.quillEditor = new this.quillService.Quill(el, editorConfig)
    this.quillEditorRegistry.registerService(this.quillEditor.scroll.domNode, this, destroy$)
    this.updateComponent = updateComponent;
    return this.quillEditor
  }


  /**
   * adds a domNode to the index this.domNodes
   */
  public addDomNode(key: number, value: Node) {
    if (!this.domNodes[key]) this.domNodes[key] = value;
  }

  /**
  * removes a domNode to the index this.domNodes
  */
  public removeDomNode(key: number) {
    delete this.domNodes[key];
  }


  /**
   * Enables the highlighting of the node with given charid
   * Extracts the DomNode from "domNodes" where the key matches charid.
   * - adds class for highlighting
   * - adds event listeners for click, mouseenter, mouseleave
   */
  highlightNode(charid: number) {
    const n = this.domNodes[charid];
    if (n) {
      this.renderer.addClass(n, 'gv-quill-text-highlight');
      this.clickCbIndex[charid] = () => { this.highlightClicked$.next(charid) }
      n.addEventListener('click', this.clickCbIndex[charid])
      this.mouseenterCbIndex[charid] = () => { this.highlightMouseentered$.next(charid) }
      n.addEventListener('mouseenter', this.mouseenterCbIndex[charid])
      this.mouseleaveCbIndex[charid] = () => { this.highlightMouseleft$.next(charid) }
      n.addEventListener('mouseleave', this.mouseleaveCbIndex[charid])
    }
  }

  createHighlightCallback(charid) {
    return this.domNodes[charid]
  }

  /**
   * Disables the highlighting of the node with given charid
   * Extracts the DomNode from "domNodes" where the key matches charid.
   * - removes class for highlighting
   * - removes event listeners for click, mouseenter, mouseleave
   */
  unlightNode(charid: number) {
    const n = this.domNodes[charid];
    if (n) {
      this.renderer.removeClass(n, 'gv-quill-text-highlight');
      n.removeEventListener('click', this.clickCbIndex[charid])
      n.removeEventListener('mouseenter', this.mouseenterCbIndex[charid])
      n.removeEventListener('mouseleave', this.mouseleaveCbIndex[charid])
    }
  }

  /**
   * Enables accent of the node with given charid
   * - adds class for accent
   */
  accentuateNode(charid: number) {
    const n = this.domNodes[charid];
    if (n) {
      this.renderer.addClass(n, 'gv-quill-text-accent');
    }
  }
  /**
   * Disables accent of the node with given charid
   * - removes class for accent
   */
  unaccentuateNode(charid: number) {
    const n = this.domNodes[charid];
    if (n) {
      this.renderer.removeClass(n, 'gv-quill-text-accent');
    }
  }


  batchInsertContent(dialogTitle: string, ops: Ops, done?: () => void) {

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
    const progDialogData: ProgressDialogData = {
      title: dialogTitle,
      mode$: new BehaviorSubject<ProgressMode>('determinate'),
      value$
    }

    timer(200).pipe(takeUntil(done$)).subscribe(() => {
      progDialog = this.openProgressDialog(progDialogData)
    })

    const addBatch = () => {
      const start = i * batchsize;
      const end = start + batchsize;
      const nextDeltaChunk = ops.slice(start, end)
      // const nextDeltaChunk = remainingOps.splice(0, batchsize);
      const existingContentLength = this.quillEditor.getLength() - 1;
      if (i > 0) nextDeltaChunk.unshift({ retain: existingContentLength })
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
        this.batchInsertingContent = false;
        this.updateComponent()
        if (done) done();
      }
      i++;
    }
    addBatch()
  }

  openProgressDialog(data: ProgressDialogData) {
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

}
