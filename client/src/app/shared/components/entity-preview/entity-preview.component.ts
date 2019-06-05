import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { EntityPreview, ActiveProjectService } from 'app/core';

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

  click(){
    if(this.openTabOnClick) this.p.addEntityTab(this.preview)
  }
}
