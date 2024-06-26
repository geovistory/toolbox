import { Injectable } from '@angular/core';
import type { ViewFieldHasValueVersionComponent } from '../view-field-has-value-version/view-field-has-value-version.component';

@Injectable()
export class EditTextDialogService {

  editor: ViewFieldHasValueVersionComponent;

  registerComponent(editor: ViewFieldHasValueVersionComponent) { this.editor = editor }

}
