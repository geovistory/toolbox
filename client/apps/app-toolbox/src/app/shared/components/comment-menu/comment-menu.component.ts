import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'gv-comment-menu',
  templateUrl: './comment-menu.component.html',
  styleUrls: ['./comment-menu.component.scss']
})
export class CommentMenuComponent implements OnInit {

  @Input() title = 'Text';
  @Input() content = '';
  @Output() onChange = new EventEmitter<string>();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  constructor(private _ngZone: NgZone) { }

  ngOnInit(): void { }

  validate() {
    this.onChange.emit(this.content)
  }

}
