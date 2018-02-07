import {
  Component, OnInit, AfterViewInit, Input, Output, EventEmitter,
  ViewChild, ChangeDetectorRef, Renderer, Inject, OnDestroy
} from '@angular/core';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { Token } from '../shared/classes/appellation-token/appellation-token';
import { AppellationService } from '../shared/services/appellation.service';


@Component({
  selector: 'gv-name-part-string-edit',
  templateUrl: './name-part-string-edit.component.html',
  styleUrls: ['./name-part-string-edit.component.scss']
})
export class NamePartStringEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('element') element;


  /**
   * Inputs
   */

  @Input() token: Token;
  @Input() appellationLabel: AppellationLabel;


  /**
   * Outputs
   */

  @Output() enterKey = new EventEmitter();
  @Output() labelChange: EventEmitter<AppellationLabel> = new EventEmitter();

  /**
   * Properties
   */

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

  constructor(
    private renderer: Renderer,
    private ref: ChangeDetectorRef,
    public appellationService: AppellationService
  ) {
    this.focusEventEmitter.subscribe(caretPosition => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
      if (caretPosition) {
        this.setCaret(caretPosition)
      }
    });
  }

  get index() {
    return this.appellationLabel.tokens.indexOf(this.token);
  }

  get hasNextToken() {
    return this.appellationLabel.tokens[(this.index + 1)] !== undefined;
  }

  get hasPreviousToken() {
    return this.appellationLabel.tokens[(this.index + -1)] !== undefined;
  }

  get nextToken() {
    return this.appellationLabel.tokens[(this.index + 1)];
  }

  get previousToken() {
    return this.appellationLabel.tokens[(this.index + -1)];
  }

  get caretAtLastPosition(): boolean {
    return this.keyDownCaretPosition === this.token.string.length;
  }

  get caretAtFirstPosition(): boolean {
    return this.keyDownCaretPosition === 0;
  }

  get caretPosition(): number {
    return this.element.nativeElement.selectionStart;
  }


  ngOnInit() {

    this.token.namePartStringEditComponent = this;

    this.namePartTypes = this.appellationService.getNamePartTypes();

    this.selectedNamePartType = this.appellationService.getNamePartTypeById(this.token.typeId);

    // Propagate the splitting for strings with multiple split characters that
    // are inserted at once in the input field, e.g. by copy-pasting.
    this.splitToken();
  }

  ngOnDestroy() {
    this.labelChange.emit(this.appellationLabel)
  }

  ngAfterViewInit() {
    if (this.token.autofocus) {
      this.focus()
    }
  }

  onInput() {
    this.splitToken();
  }

  onKeydown(event) {
    this.keyDownCaretPosition = this.caretPosition;
    if (event.key === "ArrowRight") this.onArrowRightDown();
    else if (event.key === "ArrowLeft") this.onArrowLeftDown();
    else if (event.key === "Backspace") this.onBackspaceDown();
    else if (event.key === "Enter") this.onEnterDown();
  }

  onArrowRightDown() {
    if (this.caretAtLastPosition || this.token.isSeparator) {
      this.focusOnNextToken();
    }
  }

  onArrowLeftDown() {
    if (this.caretAtFirstPosition || this.token.isSeparator) {
      this.focusOnPreviousToken();
    }
  }

  onBackspaceDown() {
    if (this.token.string.length === 0 || this.token.isSeparator) {
      if (this.appellationLabel.tokens.length > 1) {
        this.focusOnPreviousToken();
        this.appellationLabel.deleteToken(this.token);
      }
    }
  }

  onEnterDown() {
    this.enterKey.emit();
  }

  focus(caretPosition?: number) {
    this.focusEventEmitter.emit(caretPosition ? caretPosition : undefined);
  }

  focusOnNextToken() {
    if (this.hasNextToken) {
      this.nextToken.namePartStringEditComponent.focus();
    }
  }

  focusOnPreviousToken() {
    if (this.hasPreviousToken) {
      this.previousToken.namePartStringEditComponent.focus(this.previousToken.string.length);
    }
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
    let string = this.token.string;

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
      // setTimeout(() => {
      //
      // }, 0);
      this.token.string = split[2];

      // call this function again, so that the new string is split
      this.splitToken();

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

      // insert token after, containing test of string, e.g. ' Jacob Müller '
      this.insertTokenAfter(newTokenString, isSeparator);

    }  // if string is only a separator-character but token is no separator-token
    else if (split2 && !split2[1] && split2[2] && (this.token.isSeparator === false)) {
      // insert new token after, containing empty string
      const isSeparator = false;
      const newTokenString = '';
      this.insertTokenAfter(newTokenString, isSeparator);

      // make this a separtor token
      // setTimeout(() => this.token.isSeparator = true, 0);
      this.setTokenSeparator(true);

    }
    else {
      this.labelChange.emit(this.appellationLabel)
    }
    this.ref.detectChanges();
  }

  insertTokenBefore(newTokenString, isSeparator) {
    this.appellationLabel.insertToken(this.token, this.index, newTokenString, isSeparator);
  }
  insertTokenAfter(newTokenString, isSeparator) {
    this.appellationLabel.insertToken(this.token, (this.index + 1), newTokenString, isSeparator);
  }

  setTokenString(newString: string): void {
    this.token.string = newString;
    this.labelChange.emit(this.appellationLabel)
  }

  setTokenSeparator(bool: boolean): void {
    this.token.isSeparator = bool;
    this.labelChange.emit(this.appellationLabel)
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
      this.token.typeId = undefined;
    }

    this.stopEditingType();
  }

  private setCaret(position): void {
    this.element.nativeElement.selectionStart = position;
  }
}
