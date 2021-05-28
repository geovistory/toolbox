import { Directive, ElementRef, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Directive({
  selector: '[gvCopyClipboard]'
})
export class CopyClipboardDirective {

  @Input() toClipboard: string;

  constructor(private el: ElementRef, private _snackBar: MatSnackBar) {
    console.log('hello world')
    navigator.clipboard.writeText(this.toClipboard);
    this._snackBar.open('Id [' + this.toClipboard + '] has been put in clipboard!')
  }

}
