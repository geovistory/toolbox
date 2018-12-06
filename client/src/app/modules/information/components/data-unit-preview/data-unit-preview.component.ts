import { Component, OnInit, Input } from '@angular/core';
import { DataUnitPreview } from 'app/core';

@Component({
  selector: 'gv-data-unit-preview',
  templateUrl: './data-unit-preview.component.html',
  styleUrls: ['./data-unit-preview.component.scss']
})
export class DataUnitPreviewComponent implements OnInit {

  @Input() preview: DataUnitPreview
  @Input() dragEnabled = true;

  constructor() { }

  ngOnInit() {
  }

}
