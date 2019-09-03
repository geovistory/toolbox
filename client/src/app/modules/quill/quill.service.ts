/// <reference types="quill" />

import { Injectable, ChangeDetectorRef } from '@angular/core';

import Quill from 'quill';
import Delta from 'quill/node_modules/quill-delta';
import { DeltaI, Op } from './quill.models';
import { Observable, BehaviorSubject, Subject, asapScheduler, asyncScheduler } from '../../../../node_modules/rxjs';
import { clone } from 'ramda';

const Inline = Quill.import('blots/inline');

class NodeBlot extends Inline {

  static blotName = 'charid';
  static tagName = 'span';


  static create(value) {
    const node = super.create();
    // add id here
    node.setAttribute('charid', value);

    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a blot, so we do
    // not need to check ourselves
    return node.getAttribute('charid');
  }
}

Quill.register(NodeBlot, false);

// const Block = Quill.import('blots/block');

// class CustomBlock extends Block {

//   constructor(domNode, x) {
//     super(domNode);
//     domNode.setAttribute('node', 999);
//     this.cache = {};
//   }

//   static create(value) {
//     const node = super.create()
//     node.setAttribute("node", value)
//     return node
//   }

//   // static formats(node) {
//   //   // We will only be called with a node already
//   //   // determined to be a blot, so we do
//   //   // not need to check ourselves
//   //   return node.getAttribute('node');
//   // }

//   // split(index, force = false) {
//   //   if (force && (index === 0 || index >= this.length() - 1)) {
//   //     const clone = this.clone()
//   //     clone.domNode.node = '999'
//   //     if (index === 0) {
//   //       this.parent.insertBefore(clone, this)
//   //       return this
//   //     }
//   //     this.parent.insertBefore(clone, this.next)
//   //     return clone
//   //   }
//   //   const next = super.split(index, force)
//   //   next.domNode.node = '999'
//   //   this.cache = {}
//   //   return next
//   // }
// }
// CustomBlock.blotName = "block"
// CustomBlock.tagName = "p"

// Quill.register(CustomBlock, false);

const Parchment = Quill.import("parchment")

// const QidAttribute = new Parchment.Attributor.Attribute('node', 'block-node')
const QidAttribute = new Parchment.Attributor.Attribute('blockid', 'blockid', {
  // scope: Parchment.Scope.INLINE,
});
Parchment.register(QidAttribute);


Quill.register({
  'attributors/attribute/blockid': QidAttribute
}, true);

// Quill.register({
//   'formats/node': QidAttribute,
// }, true);


export type TokenType = 'regChar' | 'sepChar' | undefined;
export interface NextToken { length: number, type: TokenType }
export interface PrecedingToken { id: number, type: TokenType }


export interface CharacterizeResult {
  delta: DeltaI,
  latestId: number
};
export interface CharacerizeFeedback {
  progress: Observable<number>, // progress starting with 0 ending with 1
  result: Observable<CharacterizeResult>
}

@Injectable()
export class QuillService {

  readonly SEPARATOR_REGEX = /[^\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]/

  readonly BEGINING_SEPARATOR = /^[^\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]{0,1}/
  readonly BEGINING_WORD = /^[\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]{0,}/

  Quill = Quill;

  constructor() { }

  /**
   * Creates a insert operation for each character on content change event.
   */
  characterizeContentChange(delta: DeltaI, oldDelta: DeltaI, latestId: number): CharacerizeFeedback {
    const progress = new BehaviorSubject<number>(0);
    const result = new Subject<CharacterizeResult>();

    if (delta.ops.filter(op => op.hasOwnProperty('retain')).length > 1) {
      console.warn('more than one retain', clone(delta.ops))
    }

    asapScheduler.schedule(() => {

      const newDelta = new Delta();

      const done = () => {
        progress.next(1);
        result.next({ delta: newDelta, latestId: latestId });
        progress.complete();
        result.complete()
      }


      // if user did insert something
      if (this.isInsert(delta)) {
        let id = latestId * 1;
        let newOps: any[] = [];


        // length of ops array used to generate progress feedback
        const origOpsLength = delta.ops.length;

        // init newOps and oldOps
        if (this.beginsWithRetain(delta)) {
          // ad first op to new newOps and remove the first item of oldOps
          newOps.push(delta.ops.shift());

        } else if (this.endsWithRetain(delta)) {
          newOps = this.initOpsThatEndWithRetains(delta)
        }

        // number of syncronously executed calls of addRetainOp()
        let syncAddRetainOpCalls = 0;

        const addRetainOp = () => {

          syncAddRetainOpCalls++;

          const insert = delta.ops[0].insert;
          if (insert) {

            // drop first n characters of string
            delta.ops[0].insert = insert.substring(1);

            id = id + 1;

            // add the chars to the precedingToken
            newOps.push({
              retain: 1,
              attributes: { charid: id, blockid: id }
            } as Op)

          }

          // if op.insert is now empty, remove the op
          if (delta.ops[0].insert === '' || delta.ops[0].insert === undefined) delta.ops.shift();

          // if there are remaining ops, start next iteration
          if (delta.ops.length) {

            // make syncronous calls for batches of 100
            if (syncAddRetainOpCalls < 100) {
              // synchronously call recursive function
              addRetainOp()

            } else {
              syncAddRetainOpCalls = 0;

              progress.next((origOpsLength - delta.ops.length) / origOpsLength);

              // asynchronously call recursive function
              // to prevent 'maximum callstack exeeded' exceptions
              asyncScheduler.schedule(() => {
                addRetainOp()
              }, 0)

            }

          } else {
            newDelta.ops = newOps;
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

    // return { delta: newDelta, latestId: latestId };
    return { progress, result }
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







}
