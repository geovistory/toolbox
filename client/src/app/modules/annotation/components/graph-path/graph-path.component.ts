import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export interface GraphPathSegment {
  entity?: {
    label: string;
    icon: string;
    tooltip: string;
  };
  property?: {
    label: string;
    tooltip: string;
  };
}

export type GraphPathMode = 'mini' | 'small' | 'full';

@Component({
  selector: 'gv-graph-path',
  templateUrl: './graph-path.component.html',
  styleUrls: ['./graph-path.component.scss']
})
export class GraphPathComponent implements OnInit {
  @Input() data: GraphPathSegment[];
  modes: GraphPathMode[] = ['mini', 'small', 'full'];
  @Input() mode: GraphPathMode;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.mode = this.mode ? this.mode : 'mini';

    setTimeout(() => {
      this.onClick.emit({ hello: 'hello' })
    }, 3000)
  }



}

export function switchViewMode(mode: GraphPathMode): GraphPathMode {
  const modes: GraphPathMode[] = ['mini', 'small', 'full'];
  const i = modes.indexOf(mode);
  const j = i < modes.length - 1 ? i + 1 : 0;
  return modes[j];
}
