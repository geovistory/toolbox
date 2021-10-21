import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gv-comment-menu',
  templateUrl: './comment-menu.component.html',
  styleUrls: ['./comment-menu.component.scss']
})
export class CommentMenuComponent implements OnInit {

  @Input() title = 'Text';
  @Input() content = '';
  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  validate() {
    this.onChange.emit(this.content)
    console.log(this.content)
  }

}
