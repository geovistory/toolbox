import { Component, OnInit, Input } from '@angular/core';
import { EntityPreview } from 'app/core';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit {

  @Input() preview: EntityPreview
  @Input() dragEnabled = true;

  constructor() { }

  ngOnInit() {
  }

}
