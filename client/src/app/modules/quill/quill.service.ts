/// <reference types="quill" />

import { Injectable, Renderer2 } from '@angular/core';
import Quill from 'quill';
import Delta from 'quill/node_modules/quill-delta';
import { clone } from 'ramda';
import { asapScheduler, asyncScheduler, BehaviorSubject, Observable, Subject } from '../../../../node_modules/rxjs';
import { IndexedCharids } from './quill-edit/quill-edit.component';
import { DeltaI, Op, Ops } from './quill.models';
import { Blot } from 'parchment/dist/src/blot/abstract/blot';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';

const Inline = Quill.import('blots/inline');
const Block = Quill.import('blots/block');
const OriginalClipboard = Quill.import('modules/clipboard');

const OriginalTextBlot = Quill.import('blots/text');

const Registry = Quill.import('parchment')
const Blockid = new Registry.Attributor.Attribute('blockid', 'blockid', {});
Registry.register(Blockid);



export type TokenType = 'regChar' | 'sepChar' | undefined;
export interface NextToken { length: number, type: TokenType }
export interface PrecedingToken { id: number, type: TokenType }


export interface CharacterizeResult {
  delta: DeltaI,
  latestId: number
};
export interface CharacerizeFeedback {
  formatText$: Observable<FormatTextParams>,
  deltaLength: number,
  latestId$: Observable<number>
}

export interface FormatTextParams {
  start: number
  length: number
  formats: {
    charid?: number,
    blockid?: number
  }
}

type UpdateType = 'before' | 'after' | 'replace';

@Injectable()
export class QuillService {

  Quill = Quill;

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

  clipboard;
  nodeBlot;
  textBlot;
  containerBlot;
  editor;
  latestId: number;
  updateContents: () => void;

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {

    this.clipboard = this.extendClipboard(this)
    this.Quill.register('modules/clipboard', this.clipboard, true);

    this.nodeBlot = this.createNodeBlot(this)
    this.Quill.register(this.nodeBlot, true);

    this.textBlot = this.createTextBlot(this)
    this.Quill.register(this.textBlot, true);

    // this.Quill.register(this.createInlineBlot(this), false);
    // this.Quill.register(this.createBlockBlot(this), false);

    this.Quill.register({ 'attributors/attribute/blockid': Blockid }, true);

  }

  extendClipboard = (service: QuillService) => {
    return class Clipboard extends OriginalClipboard {


      onPaste(e) {

        if (e.defaultPrevented || !this.quill.isEnabled()) return;
        let range = this.quill.getSelection();
        let delta = new Delta().retain(range.index);
        let scrollTop = this.quill.scrollingContainer.scrollTop;
        this.container.focus()
        this.quill.selection.update('silent');

        this.getPastedLength(e, (pastedLength) => {
          const replacedLength = range.length;
          const newLength = pastedLength + this.quill.getLength() - 1 - replacedLength;

          // Check length
          if (newLength <= service.maxLength) {
            // Length is ok, proceed
            setTimeout(() => {
              delta = delta.concat(this.convert()).delete(range.length);
              this.quill.updateContents(delta, 'user');
              // range.length contributes to delta.length()
              this.quill.setSelection(delta.length() - range.length, 'silent');
              this.quill.scrollingContainer.scrollTop = scrollTop;
              this.quill.focus();
            }, 1);
          } else {
            // To long, open dialog
            const dialogData: MatDialogConfig<ConfirmDialogData> = {
              data: {
                title: 'Pasted text too long. Sorry.',
                paragraphs: [
                  `This text is limited to ${service.maxLength} characters, while:`,
                  `${pastedLength} (pasted) + ${this.quill.getLength() - 1} (existing) - ${replacedLength} (replaced) = ${newLength} characters`
                ],
                hideNoButton: true,
                noBtnText: '',
                yesBtnText: 'Close',
                yesBtnColor: 'primary'
              }
            }
            service.dialog.open(ConfirmDialogComponent, dialogData)
            this.container.innerHTML = '';
          }
        })


      }

      getPastedLength(e: ClipboardEvent, callback) {
        if (e && e.clipboardData && e.clipboardData.getData && e.clipboardData.getData('Text')) {
          callback(e.clipboardData.getData('Text').length)
        } else {
          setTimeout(() => {
            callback(this.container.innerText.length)
          }, 1)
        }
      }

    }
  }
  createTextBlot = (service: QuillService) => {
    return class TextBlot extends OriginalTextBlot {

      splitChars(mutations: MutationRecord[]) {
        const mutation = mutations[0]
        const oldValue = mutation.oldValue;
        const newValue = this.statics.value(this.domNode);
        let offset = this.offset(service.editor.editor.scroll);
        const range = service.editor.getSelection();
        const updateType = this.retrieveUpdateType(range, newValue, oldValue);
        let newText;


        if (service.editor.getLength() <= service.maxLength) {

          if (updateType === 'after') {
            newText = newValue.charAt(1);
            offset++;
          } else if (updateType === 'before') {
            newText = newValue.charAt(0);
          }


          // Update the DOM (view)
          this.parent.addNodeBlot(newText, updateType)
          this.domNode.data = oldValue;

          // Update the blot (controller)
          this.text = oldValue;


          // Update the editor (delta and history)
          service.editor.scroll.update('user')

          // Update the cursor position
          service.editor.setSelection(offset + 1)

        } else {

          // Update the DOM (view)
          this.domNode.data = oldValue;

          // Update the blot (controller)
          this.text = oldValue;

          // Update the cursor position
          service.editor.setSelection(offset + 1)
        }

      }

      update(mutations, context) {
        const _this = this;
        if (mutations.some(function (mutation) {
          return mutation.type === 'characterData' && mutation.target === _this.domNode;
        })) {

          if (this.domNode.textContent.length > 1) {
            this.splitChars(mutations)
          } else {
            this.text = this.statics.value(this.domNode);
          }
        }
      };

      /**
       * Finds out wether the new character was added before (left) or after (right)
       * of the character.
       *
       * Unfortunately the range given by quill is indifferent, on second line onwards,
       * so that we have to rely on the characters. Therefore this function returns
       * a wrong value, if the characters are equal and the new character was added
       * before the old one, from second line onwards. This is a rare case and the
       * effect is not crutial: The new character is added after instead of before
       * the old one, which makes the cursor 'jumping over' the old and new characters
       * and which can lead to unwanted wholes in annotations.
       */
      private retrieveUpdateType(range, newText, oldText): UpdateType {
        const c0 = newText.charAt(0);
        const c1 = newText.charAt(1);
        if (c0 !== c1) {
          if (oldText === newText.charAt(0)) return 'after';
          if (oldText === newText.charAt(1)) return 'before';
        } else {
          if (service.editor.editor.delta.length() == 2) return 'after';
          if (range.index > 1) return 'after';
          return 'before'
        }

        // if (offset + 2 === range.index) return 'after';
        // else if (offset + 1 === range.index) return 'before';
        // else console.error('Could not retrieve UpdateType on splitting charid blot')
      }
    }
  }

  createNodeBlot = (service: QuillService) => {
    return class NodeBlot extends Inline {

      static blotName = 'charid';
      static tagName = 'span';



      static create(value) {
        const node = super.create();
        // add id here
        node.setAttribute('charid', value);

        service.addDomNode(value, node)

        return node;
      }


      static formats(node) {
        // We will only be called with a node already
        // determined to be a blot, so we do
        // not need to check ourselves
        return node.getAttribute('charid');
      }

      addNodeBlot(newText: string, updateType: UpdateType) {

        const newNodeBlot = Registry.create('charid', ++service.latestId);
        const newTextBlot = new service.textBlot(service.textBlot.create(newText), true);
        newNodeBlot.appendChild(newTextBlot)
        const next = updateType === 'after' ? this.next : this;
        this.parent.insertBefore(newNodeBlot, next);

        return newNodeBlot;
      }


      remove() {
        if (this.domNode.innerHTML !== '') {
          service.removeDomNode(this.domNode.getAttribute('charid'))
        }

        if (this.domNode.parentNode != null) {
          this.domNode.parentNode.removeChild(this.domNode);
        }
        this.detach();
      }

      detach() {
        const value = this.domNode.getAttribute('charid')
        // service.removeDomNode(value)
        super.detach()
      }
      attach() {
        const value = this.domNode.getAttribute('charid')
        // service.addDomNode(value, this.domNode)
        super.attach()
      }
      // split(index: number, force: boolean = false) {

      //   const x = super.split(index, force);
      //   if(x)
      //   return x

      // }

      split(index: number, force: boolean = false): NodeBlot {
        if (!force) {
          if (index === 0) return this;
          if (index === this.length()) return this.next;
        }
        let after = this.clone();
        this.parent.insertBefore(after, this.next);
        this.children.forEachAt(index, this.length(), function (child, offset, length) {
          child = child.split(offset, force);
          after.appendChild(child);
        });

        // Update domNode index
        if (force) {
          const value = this.domNode.getAttribute('charid')
          service.removeDomNode(value)
          service.addDomNode(value, after.domNode)
        }
        return after;
      }

      update(mutations: MutationRecord[], context: { [key: string]: any }): void {
        super.update(mutations, context);
      }


      constructor(public domNode) {
        super(domNode)
      }
    }
  }

  /**
   * adds a domNode to the index this.domNodes
   */
  private addDomNode(key: number, value: Node) {
    if (!this.domNodes[key]) this.domNodes[key] = value;
  }

  /**
  * removes a domNode to the index this.domNodes
  */
  private removeDomNode(key: number) {
    delete this.domNodes[key];
  }


  /**
   * Enables the highlighting of the node with given charid
   * Extracts the DomNode from "domNodes" where the key matches charid.
   * - adds class for highlighting
   * - adds event listeners for click, mouseenter, mouseleave
   */
  highlightNode(charid: number) {
    const x = Registry;
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

  /**
   * Creates a insert operation for each character on content change event.
   */
  characterizeContentChange(delta: DeltaI, oldDelta: DeltaI, latestId: number): CharacerizeFeedback {
    const latestId$ = new Subject<number>();
    const formatText$ = new Subject<FormatTextParams>();
    const deltaLength = delta.length();

    if (delta.ops.filter(op => op.hasOwnProperty('retain')).length > 1) {
      console.warn('more than one retain', clone(delta.ops))
    }

    asapScheduler.schedule(() => {

      const newDelta = new Delta();

      const done = () => {
        latestId$.next(latestId);
        latestId$.complete()
      }


      // if user did insert something
      if (this.isInsert(delta)) {
        let id = latestId * 1;
        let newOps: any[] = [];

        // init newOps and oldOps
        if (this.beginsWithRetain(delta)) {
          // ad first op to new newOps and remove the first item of oldOps
          newOps.push(delta.ops.shift());

        } else if (this.endsWithRetain(delta)) {
          newOps = this.initOpsThatEndWithRetains(delta)
        }

        // get initial retain
        // TODO: if approach with formatText$ is more performant
        // than making one big delta, delete newOps and
        // retrieve retain value more directly
        let retain = newOps.length < 1 ? 0 : newOps[0].retain;

        // number of syncronously executed calls of addRetainOp()
        let syncAddRetainOpCalls = 0;

        const addRetainOp = () => {

          syncAddRetainOpCalls++;
          // take the first operation
          const op = delta.ops[0];

          // if this is a insert operation
          if (op.insert) {

            // drop first n characters of string
            delta.ops[0].insert = op.insert.substring(1);

            id = id + 1;

            formatText$.next({
              start: retain,
              length: 1,
              formats: { charid: id, blockid: id }
            })
            retain++;
          }

          // if op.insert is now empty, remove the op
          if (delta.ops[0].insert === '' || delta.ops[0].insert === undefined) delta.ops.shift();

          // if there are remaining ops, start next iteration
          if (delta.ops.length) {

            // make syncronous calls for batches of 100
            if (syncAddRetainOpCalls < 10000) {
              // synchronously call recursive function
              addRetainOp()

            } else {
              syncAddRetainOpCalls = 0;


              // asynchronously call recursive function
              // to prevent 'maximum callstack exeeded' exceptions
              asyncScheduler.schedule(() => {
                addRetainOp()
              }, 0)

            }

          } else {
            // newDelta.ops = newOps;
            latestId = id;
            done()
          }

        }

        // start nodenization
        addRetainOp();



      } else {
        done()
      }

    });

    return { latestId$: latestId$, formatText$, deltaLength }
  }

  /**
   * Checks if the given delta (from text-change trigger) is a insert statement
   * @param d
   */
  isInsert(d): boolean {
    return (
      d.ops[0] && d.ops[0].hasOwnProperty('insert') ||
      d.ops[1] && d.ops[1].hasOwnProperty('insert')
    );
  }

  /**
   * returns true, if first op has retain
   * @param d
   */
  beginsWithRetain(d: DeltaI): boolean {
    return d.ops[0].hasOwnProperty('retain') ? true : false;
  }

  /**
   * returns, if the first is not retain, the end is a retain
   */
  endsWithRetain(d: DeltaI): boolean {

    if (
      !d.ops[0].hasOwnProperty('retain') // first is not retain
      && d.ops[d.ops.length - 1].hasOwnProperty('retain') // last is retain
    ) {
      return true;
    }

    return false;

  }

  /**
   * removes retains from given delta and returns one retain with the sum of retains
   *
   * This method is needed due to unexpected behavior of quill when
   * pasting the same formated content at the beginning of the document.
   * Quill then mixes up the order of retain and insert statements.
   *
   * @param d
   * @param ops
   */
  initOpsThatEndWithRetains(d: DeltaI): any[] {
    let retainSum = 0;

    for (let index = (d.ops.length - 1); index >= 0; index--) {
      const op = d.ops[index];
      if (op.hasOwnProperty('retain')) {
        // Create sum of all retains
        retainSum = (retainSum + op.retain);
        // remove the item from d
        d.ops.splice(index, 1);
      }
    }

    return [{
      retain: retainSum
    }];
  }

  /**
   * Returns the number of retained characters defined
   * by the first op of ops in d
   * @param d
   */
  retainIndex(d: DeltaI): number {
    return d.ops[0].hasOwnProperty('retain') ? d.ops[0].retain : 0;
  }

  /**
   * Returns the lenght of the insert statement found in the
   * first or second op in ops
   * @param d
   */
  insertedLength(d: DeltaI): number {
    return d.ops[0].hasOwnProperty('insert') ? d.ops[0].insert.length :
      d.ops[1].hasOwnProperty('insert') ? d.ops[1].insert.length : 0;
  }



  /**
   * returns the op in ops of delta that comes on the position
   * of index
   * @param delta
   * @param index
   */
  getOpByIndex(delta: DeltaI, index) {
    let r = index; // remaining

    for (let i = 0; i < delta.ops.length; i++) {
      const op = delta.ops[i];
      // if op is before the change
      if (op.insert.length < r) {
        r = r - op.insert.length;
      } else {
        return op;
      }
    }
  }

  createEditor = (el, editorConfig, updateContents, maxLength) => {
    this.maxLength = maxLength
    this.editor = new this.Quill(el, editorConfig)
    this.updateContents = updateContents;
    return this.editor
  }

  createEnterHandle() {
    const BLOCK = Registry.Scope.BLOCK;
    const USER = 'user';
    const SILENT = 'silent';
    const _this = this;
    return function (range, context) {

      const lineFormats = Object.keys(context.format).reduce(
        (formats, format) => {
          if (
            Registry.query(format, BLOCK) &&
            !Array.isArray(context.format[format])
          ) {
            formats[format] = context.format[format];
          }
          return formats;
        },
        {},
      );
      const delta = new Delta()
        .retain(range.index)
        .delete(range.length)
        .insert('\n', lineFormats);
      this.quill.updateContents(delta, USER);
      this.quill.setSelection(range.index + 1, SILENT);
      this.quill.focus();

      Object.keys(context.format).forEach(name => {
        if (lineFormats[name] != null) return;
        if (Array.isArray(context.format[name])) return;
        // Geovistory customization for charid
        if (name === 'charid' || name === 'code' || name === 'link') return;
        this.quill.format(name, context.format[name], USER);
      });

    }
  }


}
