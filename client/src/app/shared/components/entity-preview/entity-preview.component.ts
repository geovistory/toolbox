import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { EntityPreview, ActiveProjectService } from 'app/core';
import { MatMenuTrigger } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit {

  @Input() preview: EntityPreview
  @Input() dragEnabled = true;
  @Input() openTabOnClick = false;

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {

  }

  openInNewTab(){
    this.p.addEntityTab(this.preview)
  }
}
