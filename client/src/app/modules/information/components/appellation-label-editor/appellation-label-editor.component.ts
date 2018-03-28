import { Component, OnInit, Renderer, Input, Output, EventEmitter, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { AppellationLabel, InsertTokenRequest, UpdateTokenStringRequest, UpdateTokenIsSeparatorRequest } from '../../shared/appellation-label/appellation-label';
import { AppellationLabelTokenComponent } from '../appellation-label-token/appellation-label-token.component';
import { Token } from '../../shared/appellation-token/appellation-token';

@Component({
  selector: 'gv-appellation-label-editor',
  templateUrl: './appellation-label-editor.component.html',
  styleUrls: ['./appellation-label-editor.component.scss']
})
export class AppellationLabelEditorComponent implements OnInit {

  @Input() appellationLabel: AppellationLabel;

  @Output() readyToCreate: EventEmitter<AppellationLabel> = new EventEmitter();

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter();

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
      )
      this.notReadyToCreate.emit()
      else
      this.readyToCreate.emit(this.appellationLabel);
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

  focusOnToken(token: Token, caretPosition?: number) {

    const i = this.appellationLabel.getIndex(token);

    const component = this.tokenComponents.find((item, index) => {
      return (index === i)
    });

    this.renderer.invokeElementMethod(component.element.nativeElement, 'focus', []);


    if (caretPosition !== undefined && component.element.nativeElement.selectionStart >= 0)
    component.setCaret(caretPosition);

  }

}
