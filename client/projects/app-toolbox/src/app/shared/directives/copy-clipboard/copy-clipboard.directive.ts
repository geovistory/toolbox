import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Directive({
  selector: '[gvCopyClipboard]'
})
export class CopyClipboardDirective {

  @Input() toClipboard: string;
  @Input() clipBoardActivated = true;

  constructor(private el: ElementRef, private _snackBar: MatSnackBar) { }

  @HostListener('click') onClick() {
    if (!this.clipBoardActivated || this.toClipboard == null) return;
    navigator.clipboard.writeText(this.toClipboard);
    this._snackBar.open('Id [' + this.toClipboard + '] has been put in clipboard!', '', { duration: 3000 })
  }

}
