import { Component, OnInit, Input } from '@angular/core';
import { ActiveProjectService } from 'app/core';

import { DatDigital } from "app/core/sdk";

@Component({
  selector: 'gv-digital-preview',
  templateUrl: './digital-preview.component.html',
  styleUrls: ['./digital-preview.component.scss']
})
export class DigitalPreviewComponent implements OnInit {
  @Input() digital: DatDigital
  @Input() openTabOnClick = false;

  label: string;

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {
    this.label = this.digital.string.substr(0, 20) + (this.digital.string.length > 20 ? '...' : '');
  }

  click() {
    if (this.openTabOnClick) this.p.addTextTab(this.digital.pk_entity)
  }
}
