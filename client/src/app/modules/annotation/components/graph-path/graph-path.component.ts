import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService } from "app/core/active-project";
import { WarEntityPreview } from 'app/core/sdk-lb4';
export interface GraphPathEntity {
  label: string;
  icon: string;
  tooltip: string;
  fkClass?: number;
  pkEntity?: number;
  preview?: WarEntityPreview;
  isDigitalText?: boolean;
  isDigitalTable?: boolean;
  fkRow?: string;
  fkDigital?: number;
};

export interface GraphPathSegment {
  entity?: GraphPathEntity;
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

  openEntityInNewTab(preview: WarEntityPreview) {
    this.p.addEntityTab(preview.pk_entity, preview.fk_class)
  }

  openTextInNewTab(pkEntity: number) {
    this.p.addTextTab(pkEntity)
  }

  openTableInNewTab(pkEntity: number) {
    this.p.addTableTab(pkEntity)
  }

  openCellInNewTab(fkDigital: number, fkRow: number) {
    this.p.addTableTab(fkDigital, fkRow);
  }

}

export function switchViewMode(mode: GraphPathMode): GraphPathMode {
  const modes: GraphPathMode[] = ['mini', 'small', 'full'];
  const i = modes.indexOf(mode);
  const j = i < modes.length - 1 ? i + 1 : 0;
  return modes[j];
}
