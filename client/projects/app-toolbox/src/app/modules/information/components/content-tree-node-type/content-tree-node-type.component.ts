import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ContentTreeComponent, ContentTreeNode } from '../content-tree/content-tree.component';

@Component({
  selector: 'gv-content-tree-node-type',
  templateUrl: './content-tree-node-type.component.html',
  styleUrls: ['./content-tree-node-type.component.scss']
})
export class ContentTreeNodeTypeComponent implements OnInit {

  @Input() node: ContentTreeNode;
  type: string;
  constructor(public contentTree: ContentTreeComponent
  ) { }


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
