import { Component, Input, OnInit } from '@angular/core';
import { EntityPreview } from 'app/core';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';

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

  openInNewTab() {
    this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
  }
  addAndOpenInNewTab() {
    this.p.addPeItToProject(this.preview.pk_entity, () => {
      this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
    })
  }
}
