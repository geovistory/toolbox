import { Component, OnInit, Input } from '@angular/core';
import { ContentTreeNode } from '../content-tree/content-tree.component';
import { SysConfig } from "@kleiolab/lib-config";
import { latestVersion } from "@kleiolab/lib-utils";
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { Observable, of } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';
import { ActiveProjectPipesService } from "@kleiolab/lib-queries";

@Component({
  selector: 'gv-content-tree-node-label',
  templateUrl: './content-tree-node-label.component.html',
  styleUrls: ['./content-tree-node-label.component.scss']
})
export class ContentTreeNodeLabelComponent implements OnInit {

  @Input() node: ContentTreeNode;

  label$: Observable<string>;

  digitalLabel: string;

  icon: string;

  constructor(private ap: ActiveProjectPipesService) { }

  ngOnInit() {
    if (this.node.datDigital) {
      if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
        const str = this.node.datDigital.string
        this.digitalLabel = str.substring(0, 100) + (str.length > 100 ? '…' : '')
        this.icon = 'file-document'

      } else if (this.node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
        this.digitalLabel = 'Table ' + this.node.datDigital.pk_entity;
        this.icon = 'file-table'

      }
    }
    else {
      this.label$ = this.ap.streamEntityPreview(this.node.pkEntity).pipe(map(p => p.entity_label))
      this.icon = 'folder'

    }
  }

}
