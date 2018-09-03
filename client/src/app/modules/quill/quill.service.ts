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

export type TokenType = 'regChar' | 'sepChar' | undefined;
export type NextToken = { length: number, type: TokenType };

@Injectable()
export class QuillService {

  readonly SEPARATOR_REGEX = /[^\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]/

  readonly BEGINING_SEPARATOR = /^[^\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]{0,1}/
  readonly BEGINING_WORD = /^[\p{Sc}\p{So}\p{Mn}\p{P}\p{Z}À-ÿ\w]{0,}/

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
      let id = latestId;
      const ops: any[] = [];
      let lastTokenType: TokenType;
      let nextToken: NextToken;

      // init ops 
      if (this.beginsWithRetain(delta)) {
        // ad first op to new ops and remove the first item of ops
        ops.push(delta.ops.shift());

      }

      // init lastTokenType
      lastTokenType = this.initLastTokenType(oldDelta, ops);

      const addRetainOp = () => {
        // init nextToken
        nextToken = this.extractNextToken(delta);

        // if not: last char before change and first char of change ar regChars 
        if (!(lastTokenType === nextToken.type && lastTokenType === 'regChar')) {
          // increase id
          id = id + 1;
        }

        ops.push({
          retain: nextToken.length,
          attributes: { node: id }
        })

        // memorize token type for next iteration 
        lastTokenType = nextToken.type;

        // if there are remaining ops, start next iteration
        if (delta.ops.length) addRetainOp()

      }

      // start nodenization
      addRetainOp();

      newDelta.ops = ops;
      latestId = id;
    }

    return { delta: newDelta, latestId: latestId };

  }

  /**
   * Returns the type of the last character before change
   * if no last character, returns undefined.
   * @param oldDelta 
   * @param ops empty array or array containing one retain op 
   */
  initLastTokenType(oldDelta: Delta, ops: any[]): TokenType {

    if (ops.length === 0) return undefined;
    const retain = ops[0].retain;
    const slicedDelta = oldDelta.slice((retain - 1), retain);
    const lastChar = slicedDelta.ops[0].insert;
    return this.hasSeparator(lastChar) ? 'sepChar' : 'regChar';
  }

  /**
   * Returns the NextToken from given delta and removes
   * this part from the delta (eighter a piece of string or a op item) 
   * @param delta 
   */
  extractNextToken(delta: Delta): NextToken {

    // if no next token, return NextToken of type undefined
    if (!delta.ops.length || !delta.ops[0].insert) return { length: 0, type: undefined };

    // get insert string
    const insert = delta.ops[0].insert;

    /**
     * Drop first n characters of delta and remove op if empty 
     * @param n length of string to remove from delta 
     */
    const removeFromDelta = (n: number) => {
      // drop first n characters of string
      delta.ops[0].insert = insert.substring(n);

      // if op.insert is now empty, remove the op
      if (delta.ops[0].insert === '') delta.ops.shift();
    }

    const begSep = this.BEGINING_SEPARATOR.exec(insert)[0];
    if (begSep.length) {

      // begSep must be a string of length = 1
      if (begSep.length !== 1) throw new Error('Separator Tokens can contain max. one character');

      removeFromDelta(begSep.length)

      return {
        length: begSep.length,
        type: "sepChar"
      }

    }

    const wordSep = this.BEGINING_WORD.exec(insert)[0];
    if (wordSep.length) {

      removeFromDelta(wordSep.length)

      return {
        length: wordSep.length,
        type: "regChar"
      }
    }


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

  beginsWithRetain(d: Delta): boolean {
    return d.ops[0].hasOwnProperty('retain') ? true : false;
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
