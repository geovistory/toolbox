import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, EntityPreview } from 'app/core';
export interface GraphPathSegment {
  entity?: {
    label: string;
    icon: string;
    tooltip: string;
    fkClass?: number
    pkEntity?: number
    preview?: EntityPreview
    isDigitalText?: boolean
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

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {
    this.mode = this.mode ? this.mode : 'mini';
  }

  openEntityInNewTab(preview: EntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class, preview.entity_type)
  }

  openTextInNewTab(pkEntity: number) {
    this.p.addTextTab(pkEntity)
  }

}

export function switchViewMode(mode: GraphPathMode): GraphPathMode {
  const modes: GraphPathMode[] = ['mini', 'small', 'full'];
  const i = modes.indexOf(mode);
  const j = i < modes.length - 1 ? i + 1 : 0;
  return modes[j];
}