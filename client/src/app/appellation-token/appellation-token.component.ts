import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Appellation } from '../appellation/appellation.component';

export interface TokenInterface {
  "id": number,
  "string": string,
  "spaceAfter": boolean,
  "type": string,
  "autofocus": boolean,
  "isSeparator": boolean,
  "appellationTokenComponent"?: AppellationTokenComponent
}

export class Token implements TokenInterface {
  "id": number;
  "string": string;
  "spaceAfter": boolean;
  "type": "";
  "autofocus": boolean;
  "isSeparator": boolean;
  "appellationTokenComponent"?: AppellationTokenComponent


  constructor(data?: TokenInterface) {
    Object.assign(this, data);
  }
}


export class AppellationTokenInput {
  token:Token;
  index: number;
  event:any;
}

@Component({
  selector: 'gv-appellation-token',
  templateUrl: './appellation-token.component.html',
  styleUrls: ['./appellation-token.component.scss']
})
export class AppellationTokenComponent implements AfterViewInit, OnInit{
  @ViewChild('editableElement') editableElement;

  @Input() token: Token;
  @Input() appellation: Appellation;

  keyDownCaretPosition: number;

  get index(){
    return this.appellation.tokens.indexOf(this.token);
  }

  get hasNextToken() {
    return this.appellation.tokens[(this.index + 1)] !== undefined;
  }

  get nextToken() {
    return this.appellation.tokens[(this.index + 1)];
  }

  get  caretAtLastPosition(){
    return this.keyDownCaretPosition === this.token.string.length;
  }

  focusEventEmitter = new EventEmitter<boolean>();

  constructor() {
  }
  ngOnInit(){
    this.token.appellationTokenComponent = this;
    /**
    * Propagate the splitting for strings with multiple split characters that
    * are inserted at once in the input field, e.g. by copy-pasting.
    */
    this.splitToken(this.token.string);
  }
  ngAfterViewInit() {
    if(this.token.autofocus){
      this.focus()
    }
  }

  onInput(newString:string){
    this.token.string = newString;
    this.splitToken(newString);
  }

  onKeydown(event){
    this.keyDownCaretPosition = this.getCaretPosition();
  }

  onKeyup(event){
    if (event.key === "ArrowRight") this.onArrowRightUp();
  }

  onArrowRightUp(){
    if(this.caretAtLastPosition && this.hasNextToken){
      this.nextToken.appellationTokenComponent.focus();
    }
  }

  getCaretPosition():number{
    return window.getSelection().anchorOffset;
  }




  /**
  * private splitToken - split string in two parts at first separator
  * "Hans "                  --> 1: "Hans " 2: ""
  * " Hans"                  --> 1: "" 2: "Hans"
  * "Hans Muster"            --> 1: "Hans", 2: "Muster"
  * "Friedrich V., Herzog"   --> 1: "Friedrich", 2: "V., Herzog"
  *
  * @param  {type} string:string token string
  * @return {type}               description
  */
  private splitToken(string:string){

    // split in "starts with a separator" and "characters after separator
    // E.g. ' Hans Jacob Müller ' -> split=[' ', 'Hans Jacob Müller ']
    let regex1 = new RegExp('^([;,])(.+)', "i");
    let split = /^([\s;,])(.+)/.exec(string);



    // split2 in "chars till separator" and "separator till string end"
    // E.g. 'Hans Jacob Müller ' -> split=['Hans', ' Jacob Müller ']
    let split2  = /(^[^;,\s]*)(.+)*/.exec(string);

    // if string begins with separator followed by more characters
    if(split && split[2]) {
      const newTokenString = split[1];
      const isSeparator = true;

      // assign 'Hans Jacob Müller ' to this token.string
      this.token.string = split[2];

      // insert token before, containing the separator character, e.g. ' '
      this.insertTokenBefore(newTokenString, isSeparator);

      // call this function again, so that the new string is split
      this.splitToken(this.token.string);


    }
    // if string begins with not-separator-characters followed a separator
    else if (split2 && split2[1] && split2[2]){
      const isSeparator = false;
      const newTokenString = split2[2];

      // assign 'Hans' to this token.string
      this.token.string = split2[1];

      // insert token after, containing test of string, e.g. ' Jacob Müller '
      this.insertTokenAfter(newTokenString, isSeparator);

    }  // if string is only a separator-character but token is no separator-token
    else if (split2 && !split2[1] && split2[2] && (this.token.isSeparator===false)){
      // insert new token after, containing empty string
      const isSeparator = false;
      const newTokenString = '';
      this.insertTokenAfter(newTokenString, isSeparator);

      // make this a separtor token
      this.token.isSeparator = true;


    }

  }

  insertTokenBefore(newTokenString, isSeparator){
    this.appellation.insertToken(this.token, this.index, newTokenString, isSeparator);
  }
  insertTokenAfter(newTokenString, isSeparator){
    this.appellation.insertToken(this.token, (this.index + 1), newTokenString, isSeparator);
  }


  /**
  * private insertTokenAfter - checks, if the token should be inserted after
  * the current one.
  *
  * @param  {number} caretPosition:number description
  * @return {boolean} true: insert after, false: insert before
  */
  // private insertTokenAfter():boolean{
  //   const selection = window.getSelection();
  //   const caretPosition = selection.anchorOffset;
  //
  //   return caretPosition === 1 ? false : true;
  // }

  focus(){
    this.focusEventEmitter.emit(true);
  }

}
