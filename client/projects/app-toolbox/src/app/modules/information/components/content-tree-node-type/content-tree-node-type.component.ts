import { Component, OnInit, Input } from '@angular/core';
import { ContentTreeNode } from '../content-tree/content-tree.component';
import { Observable } from 'rxjs';
import { SysConfig } from "@kleiolab/lib-config";
import { latestVersion } from "@kleiolab/lib-utils";
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { filter, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'gv-content-tree-node-type',
  templateUrl: './content-tree-node-type.component.html',
  styleUrls: ['./content-tree-node-type.component.scss']
})
export class ContentTreeNodeTypeComponent implements OnInit {

  @Input() node: ContentTreeNode;

  type: string;
  constructor(private p: ActiveProjectService) { }


  ngOnInit() {
    if (this.node.datDigital) {

      if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
        this.type = 'Text'
      }
      else if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
        this.type = 'Table'
      }
    }
  }



}