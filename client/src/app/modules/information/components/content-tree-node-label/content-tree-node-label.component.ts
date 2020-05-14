import { Component, OnInit, Input } from '@angular/core';
import { ContentTreeNode } from '../content-tree/content-tree.component';
import { ActiveProjectService, latestVersion, SysConfig } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';

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

  constructor(private p: ActiveProjectService) { }

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
      this.label$ = this.p.streamEntityPreview(this.node.pkEntity).pipe(map(p => p.entity_label))
      this.icon = 'folder'

    }
  }

}
