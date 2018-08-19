import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import {
  AppellationLabel,
  InsertTokenRequest,
  UpdateTokenIsSeparatorRequest,
  UpdateTokenStringRequest,
} from '../../../shared/appellation-label/appellation-label';
import { Token } from '../../../shared/appellation-token/appellation-token';
import { AppellationService } from '../../../shared/appellation.service';


@Component({
  selector: 'gv-appellation-label-token',
  templateUrl: './appellation-label-token.component.html',
  styleUrls: ['./appellation-label-token.component.scss']
})
export class AppellationLabelTokenComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('element') element;


  /**
  * Inputs
  */

  @Input() token: Token;
  @Input() appellationLabel: AppellationLabel;


  /**
  * Outputs
  */

  @Output() insertTokenAfterRequest: EventEmitter<InsertTokenRequest> = new EventEmitter();

  @Output() insertTokenBeforeRequest: EventEmitter<InsertTokenRequest> = new EventEmitter();

  @Output() updateTokenStringRequest: EventEmitter<UpdateTokenStringRequest> = new EventEmitter();

  @Output() updateTokenIsSeparatorRequest: EventEmitter<UpdateTokenIsSeparatorRequest> = new EventEmitter();

  @Output() deleteTokenRequest: EventEmitter<Token> = new EventEmitter();

  @Output() focusOnNextTokenRequest: EventEmitter<Token> = new EventEmitter();

  @Output() focusOnPreviousTokenRequest: EventEmitter<Token> = new EventEmitter();

  @Output() typeChange: EventEmitter<Token> = new EventEmitter();

  @Output() didBlur: EventEmitter<void> = new EventEmitter();

  @Output() wasFocused: EventEmitter<void> = new EventEmitter();


  /**
  * Properties
  */

  string: string;

  keyDownCaretPosition: number;

  // array of name part types shown in the dropdown
  namePartTypes;

  // the selected name part type
  selectedNamePartType;

  // state of the name part type (view or edit)
  typeState: string = 'view';

  // Id a number is provided, it will be used to set the caret position on the
  // focused element
  focusEventEmitter = new EventEmitter<number>();

  // bool to say when afterViewChecked has been called once. Workaround
  // for ngAfterViewInit not working propertly
  afterViewChecked: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public appellationService: AppellationService
  ) {
    this.focusEventEmitter.subscribe(caretPosition => {
      // TODO add focus
      // this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
      if (caretPosition >= 0) {
        this.setCaret(caretPosition)
      }
    });
  }

  get index() {
    return this.appellationLabel.tokens.indexOf(this.token);
  }

  get caretAtLastPosition(): boolean {
    return this.keyDownCaretPosition === this.string.length;
  }

  get caretAtFirstPosition(): boolean {
    return this.keyDownCaretPosition === 0;
  }

  get caretPosition(): number {
    return this.element.nativeElement.selectionStart;
  }


  ngOnInit() {

    this.string = this.token.string;

    this.token.appellationLabelTokenComponent = this;

    this.namePartTypes = this.appellationService.getNamePartTypes();

    this.selectedNamePartType = this.appellationService.getNamePartTypeById(this.token.typeId);

    // Propagate the splitting for strings with multiple split characters that
    // are inserted at once in the input field, e.g. by copy-pasting.
    this.splitToken();
  }

  ngOnDestroy() {
  }

  ngAfterViewChecked() {
    
    if (!this.afterViewChecked) {
      if (this.token.autofocus) {
        this.doFocus()
      }
    }

    this.afterViewChecked = true;
  }

  onInput() {
    this.splitToken();
  }

  onKeydown(event) {
    this.keyDownCaretPosition = this.caretPosition;
    if (event.key === "ArrowRight") this.onArrowRightDown();
    else if (event.key === "ArrowLeft") this.onArrowLeftDown();
    else if (event.key === "Backspace") this.onBackspaceDown();
    // else if (event.key === "Enter") this.onEnterDown();
  }

  onArrowRightDown() {
    if (this.caretAtLastPosition || this.token.isSeparator) {
      this.focusOnNextTokenRequest.emit(this.token);
    }
  }

  onArrowLeftDown() {
    if (this.caretAtFirstPosition || this.token.isSeparator) {
      this.focusOnPreviousTokenRequest.emit(this.token);
    }
  }

  onBackspaceDown() {
    if (this.token.string.length === 0 || this.token.isSeparator) {
      this.deleteTokenRequest.emit(this.token)
    }
  }

  onBlur(){
    this.didBlur.emit();
  }

  onFocus(){
    this.wasFocused.emit();
  }

  doFocus(caretPosition?: number) {
    this.focusEventEmitter.emit(caretPosition ? caretPosition : undefined);
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
  private splitToken() {
    let string = this.string;

    // split in "starts with a separator" and "characters after separator
    // E.g. ' Hans Jacob Müller ' -> split=[' ', 'Hans Jacob Müller ']
    let regex1 = new RegExp('^([;,])(.+)', "i");
    let split = /^([\s;,])(.+)/.exec(string);



    // split2 in "chars till separator" and "separator till string end"
    // E.g. 'Hans Jacob Müller ' -> split=['Hans', ' Jacob Müller ']
    let split2 = /(^[^;,\s]*)(.+)*/.exec(string);

    // if string begins with separator followed by more characters
    if (split && split[2]) {
      const newTokenString = split[1];
      const isSeparator = true;

      // assign 'Hans Jacob Müller ' to this token.string

      // The timeout is needed for correct updating of the view
      this.setTokenString(split[2]);
      // call this function again, so that the new string is split
      this.splitToken();
      // setTimeout(() => {
      // }, 0);


      // insert token before, containing the separator character, e.g. ' '
      this.insertTokenBefore(newTokenString, isSeparator);



    }
    // if string begins with not-separator-characters followed a separator
    else if (split2 && split2[1] && split2[2]) {
      const isSeparator = false;
      const thisTokenString = split2[1];
      const newTokenString = split2[2];

      // assign 'Hans' to this token.string
      // The timeout is needed for correct updating of the view
      // setTimeout(() => this.setTokenString(thisTokenString), 0);
      this.setTokenString(thisTokenString)

      // insert token after, containing rest of string, e.g. ' Jacob Müller '
      this.insertTokenAfter(newTokenString, isSeparator);

    }  // if string is only a separator-character but token is no separator-token
    else if (split2 && !split2[1] && split2[2] && (this.token.isSeparator === false)) {
      // insert new token after, containing empty string
      const isSeparator = false;
      const newTokenString = '';
      this.insertTokenAfter(newTokenString, isSeparator);

      // make this a separtor token
      // setTimeout(() => this.setTokenSeparator(true), 0);
      this.setTokenSeparator(true);

    }
    else {
      this.setTokenString(this.string)
    }
    this.changeDetector.detectChanges();
  }

  insertTokenBefore(newTokenString, isSeparator) {
    const insertTokenRequest: InsertTokenRequest = {
      oldToken: this.token,
      newToken: new Token({
        string: newTokenString,
        type: undefined,
        autofocus: false,
        isSeparator: isSeparator
      }),
      index: this.index
    }

    this.insertTokenBeforeRequest.emit(insertTokenRequest);
  }

  insertTokenAfter(newTokenString, isSeparator) {

    const insertTokenRequest: InsertTokenRequest = {
      oldToken: this.token,
      newToken: new Token({
        string: newTokenString,
        type: undefined,
        autofocus: false,
        isSeparator: isSeparator
      }),
      index: this.index
    }

    this.insertTokenAfterRequest.emit(insertTokenRequest);
  }

  setTokenString(newString: string): void {

    this.updateTokenStringRequest.emit({
      newString: newString,
      index: this.index
    })

    this.string = newString;
    this.changeDetector.detectChanges();

  }

  setTokenSeparator(bool: boolean): void {

    this.updateTokenIsSeparatorRequest.emit({
      newIsSeparator: bool,
      index: this.index
    })

  }

  startEditingType() {
    this.typeState = 'edit';
  }

  stopEditingType() {
    this.typeState = 'view';
  }

  setNewNamePartType(typeId) {
    let filteredType = this.appellationService.getNamePartTypeById(parseInt(typeId))

    if (filteredType) {
      this.selectedNamePartType = filteredType;
      this.token.typeId = this.selectedNamePartType.id;
    }
    else {
      this.selectedNamePartType = [];
      this.token.typeId = null;
    }

    this.typeChange.emit(this.token)

    this.stopEditingType();
  }

  setCaret(position): void {
    setTimeout(() => {
      this.element.nativeElement.selectionStart = position;
      this.element.nativeElement.selectionEnd = position;
    });
  }
}
