import { Component, OnInit, Renderer, Input, Output, EventEmitter, ChangeDetectorRef, ViewChildren, QueryList, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { AppellationLabel, InsertTokenRequest, UpdateTokenStringRequest, UpdateTokenIsSeparatorRequest } from '../../shared/appellation-label/appellation-label';
import { AppellationLabelTokenComponent } from '../appellation-label-token/appellation-label-token.component';
import { Token } from '../../shared/appellation-token/appellation-token';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';

@Component({
  selector: 'gv-appellation-label-editor',
  templateUrl: './appellation-label-editor.component.html',
  styleUrls: ['./appellation-label-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppellationLabelEditorComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppellationLabelEditorComponent implements OnInit, ControlValueAccessor {

  appellationLabel: AppellationLabel;

  @Output() touched: EventEmitter<void> = new EventEmitter();


  // Array of children AppellationLabelTokenComponents
  @ViewChildren(AppellationLabelTokenComponent) tokenComponents: QueryList<AppellationLabelTokenComponent>

  constructor(
    private renderer: Renderer,
    private changeDetector: ChangeDetectorRef
  ) { }


  ngOnInit() {
    if (
      this.appellationLabel &&
      this.appellationLabel.tokens &&
      this.appellationLabel.tokens.length
    ) {
      const lastItemIndex = (this.appellationLabel.tokens.length - 1);
      this.appellationLabel.tokens[lastItemIndex].autofocus = true;
      this.labelChange(this.appellationLabel);
    }
  }

  labelChange(appeLabel: AppellationLabel) {
    if (appeLabel) {
      this.appellationLabel = appeLabel;

      if (
        this.appellationLabel.tokens.length === 1
        && this.appellationLabel.tokens[0].string === ''
      ) {
        this.onChange(null)
      }
      else {
        this.onChange(this.appellationLabel);
      }
    }
  }

  insertTokenAfter(insertTokenRequest: InsertTokenRequest) {
    const newToken = insertTokenRequest.newToken;
    const index = insertTokenRequest.index + 1;
    this.insertToken(newToken, index);
    if (newToken.isSeparator)
      this.focusOnNextToken(insertTokenRequest.newToken);
    else
      this.focusOnToken(insertTokenRequest.newToken);
  }

  insertTokenBefore(insertTokenRequest: InsertTokenRequest) {
    const index = insertTokenRequest.index;
    this.insertToken(insertTokenRequest.newToken, index);
    this.focusOnNextToken(insertTokenRequest.newToken);

  }

  insertToken(token: Token, index: number) {
    this.appellationLabel.insertToken(token, index);
    this.labelChange(this.appellationLabel)
  }

  updateTokenString(req: UpdateTokenStringRequest) {
    this.appellationLabel.updateTokenString(req);
    this.labelChange(this.appellationLabel)
  }

  updateTokenIsSeparator(req: UpdateTokenIsSeparatorRequest) {
    this.appellationLabel.updateTokenIsSeparator(req);
    this.labelChange(this.appellationLabel)
  }

  deleteToken(token: Token) {
    this.focusOnPreviousToken(token)
    this.appellationLabel.deleteToken(token);
    this.labelChange(this.appellationLabel);
  }

  focusOnPreviousToken(token) {
    if (this.appellationLabel.getHasPreviousToken(token)) {

      const previousToken = this.appellationLabel.getPreviousToken(token);

      const caretPosition = previousToken.string.length;

      this.focusOnToken(previousToken, caretPosition);

    }
  }

  focusOnNextToken(token) {
    if (this.appellationLabel.getHasNextToken(token)) {

      const nextToken = this.appellationLabel.getNextToken(token);

      this.focusOnToken(nextToken, 0);

    }
  }

  isFocusing = false;
  focusOnToken(token: Token, caretPosition?: number) {

    this.changeDetector.detectChanges()

    const i = this.appellationLabel.getIndex(token);

    const component = this.tokenComponents.find((item, index) => {
      return (index === i)
    });

    // console.log('beforeFocusCall')
    this.isFocusing = true;
    this.renderer.invokeElementMethod(component.element.nativeElement, 'focus', []);
    this.isFocusing = false;
    // console.log('afterFocusCall')

    if (caretPosition !== undefined && component.element.nativeElement.selectionStart >= 0)
      component.setCaret(caretPosition);

  }

  onFocus() {
    if (!this.isFocusing)
      console.log('focus')
  }

  onBlur() {
    if (!this.isFocusing)
      this.onTouched()
    this.touched.emit()
  }

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(appellationLabel: AppellationLabel): void {

    if (!appellationLabel) {
      this.appellationLabel = new AppellationLabel(null, '');
    } else {
      this.appellationLabel = appellationLabel;
    }
  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (appellationLabel: AppellationLabel | null) => {
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

}
