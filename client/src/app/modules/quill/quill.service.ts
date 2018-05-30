import { Injectable } from '@angular/core';

import * as Quill from 'quill';
import * as Delta from 'quill-delta/lib/delta';

let Inline = Quill.import('blots/inline');

class NodeBlot extends Inline {

  static blotName = 'node';
  static tagName = 'span';


  static create(value) {
    let node = super.create();
    // add id here
    node.setAttribute('quillnode', value);

    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('quillnode');    
  }
}

Quill.register(NodeBlot, true);

@Injectable()
export class QuillService {

  readonly SEPARATOR_REGEX = /[^\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]/

  constructor() { }

  Quill = Quill;

  /**
   * Nodenizes the delta given by the content-change event.
   * Returns the Delta with whitch the newDelta should be updated.  
   * @param delta 
   * @param oldDelta 
   */
  nodenizeContentChange(delta: Delta, oldDelta: Delta, latestId: number): { delta: Delta, latestId: number } {

    let newDelta = new Delta();

    // if user did insert something
    if (this.isInsert(delta)) {

      const retained = this.retainIndex(delta);

      // if there is some untouched content, retain it
      if (retained) {
        newDelta.retain(retained)
      }

      // if insert contains a separator
      if (this.insertsSeparator(delta)) {

        const inserted = this.insertedLength(delta);

        // - nodenize the separator
        const nodenize1 = this.nodenizeInsert(latestId);
        latestId = nodenize1.latestId;
        newDelta.ops = [...newDelta.ops, ...nodenize1.delta.ops]

        // - give the part after the insert a new id
        const nodenize2 = this.nodenizeAfterInsert(oldDelta, retained, inserted, latestId);
        latestId = nodenize2.latestId;
        newDelta.ops = [...newDelta.ops, ...nodenize2.delta.ops]
      }
      // else if the insert comes after a separator  
      // this finds also the special case of \n on lineend
      else if (this.isAfterSeparator(oldDelta, retained)) {

        // - nodenize the new inserts
        const nodenize1 = this.nodenizeInsert(latestId);
        latestId = nodenize1.latestId;
        newDelta.ops = [...newDelta.ops, ...nodenize1.delta.ops]

      }      

    }

    return { delta: newDelta, latestId: latestId };

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
   * Returns the number of retained characters defined
   * by the first op of ops in d
   * @param d 
   */
  retainIndex(d: Delta): number {
    return d.ops[0].hasOwnProperty('retain') ? d.ops[0].retain : 0;
  }

  /**
   * Returns the lenght of the insert statement found in the
   * first or second op in ops
   * @param d 
   */
  insertedLength(d: Delta): number {
    return d.ops[0].hasOwnProperty('insert') ? d.ops[0].insert.length :
      d.ops[1].hasOwnProperty('insert') ? d.ops[1].insert.length : 0;
  }

  /**
   * Checks if the given delta inserts something in the 
   * first or second op in ops and if this contains a separator
   * @param d 
   */
  insertsSeparator(d: Delta): boolean {
    let string = d.ops[0].hasOwnProperty('insert') ? d.ops[0].insert :
      d.ops[1].hasOwnProperty('insert') ? d.ops[1].insert : '';

    return this.hasSeparator(string)
  }

  /**
   * Checks if the op in ops of d that comes before the 
   * provided index is a separator
   * @param d 
   * @param index
   */
  isAfterSeparator(d, index): boolean {

    const affectedOp = this.getOpByIndex(d, index);

    if (this.isSingleSeparator(affectedOp.insert)) return true;

    // else if (this.hasSeparator(affectedOp.insert)) throw new Error('something wern wrong');

    else return false;
  }


  /**
   * returns the op in ops of delta that comes on the position
   * of index
   * @param delta 
   * @param index 
   */
  getOpByIndex(delta: Delta, index) {
    let r = index; // remaining

    for (let i = 0; i < delta.ops.length; i++) {
      const op = delta.ops[i];
      // if op is before the change 
      if (op.insert.length < r) {
        r = r - op.insert.length;
      }
      else {
        return op;
      }
    }
  }


  /**
   * create delta with one a retain that has the latest id
   * TODO: make this more flexible for different lenghts of
   * ops and inserts
   */
  nodenizeInsert(latestId): { delta: Delta, latestId: number } {
    let delta = new Delta();
    latestId++;
    delta.retain(1, { node: latestId })
    return { delta, latestId };
  }

  /**
   * nodenizes the part after the inserted text by adding
   * a new nodid
   * 
   * @param oldDelta 
   * @param retained 
   * @param inserted 
   */
  nodenizeAfterInsert(oldDelta, retained, inserted, latestId): { delta: Delta, latestId: number } {
    let r = retained
    let delta = new Delta();
    oldDelta.ops.some(op => {


      // if op is before the change 
      if (op.insert.length < r) {
        r = r - op.insert.length;
      }
      // if this is the splitted op
      else {
        const re = op.insert.length - r;

        // if re is 0, this means that there is nothing after the insert
        if (re === 0) return true; // return true breaks some()

        latestId++;
        delta.retain(re, { node: latestId })
      }

    })

    return { delta, latestId };
  }


  /**
   * Checks if given string is only one single 
   * separator character
   * @param string 
   */
  isSingleSeparator(string: string): boolean {

    // if the length is wrong, return false
    if (string.length !== 1) return false;

    // else if it has a separator, return true
    else if (this.hasSeparator(string)) return true;

    else return false;

  }

  /**
  * Checks if given string does contain 
  * any separator charactor.
  * 
  * @return true if string has separator
  */
  hasSeparator(string): boolean {
    return this.SEPARATOR_REGEX.test(string);
  }




}
