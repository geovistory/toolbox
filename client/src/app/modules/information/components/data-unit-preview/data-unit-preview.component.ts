import { Component, OnInit, Input } from '@angular/core';
import { EntityPreview } from 'app/core';

@Component({
  selector: 'gv-data-unit-preview',
  templateUrl: './data-unit-preview.component.html',
  styleUrls: ['./data-unit-preview.component.scss']
})
export class DataUnitPreviewComponent implements OnInit {

  @Input() preview: EntityPreview
  @Input() dragEnabled = true;

  constructor() { }

  ngOnInit() {
  }

}
