import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'gv-comment-menu',
    templateUrl: './comment-menu.component.html',
    styleUrls: ['./comment-menu.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatMenuModule, MatBadgeModule, MatFormFieldModule, MatInputModule, TextFieldModule, FormsModule, MatButtonModule]
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
