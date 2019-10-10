import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gv-te-ent-header',
  templateUrl: './te-ent-header.component.html',
  styleUrls: ['./te-ent-header.component.scss']
})
export class TeEntHeaderComponent implements OnInit {

  @Input() classConfig;
  @Input() selectPropState$;
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Output() startSelectProperty = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
