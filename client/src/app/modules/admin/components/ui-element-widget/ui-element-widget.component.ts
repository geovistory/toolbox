import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Widget } from '../../admin.models';

@Component({
  selector: 'gv-ui-element-widget',
  templateUrl: './ui-element-widget.component.html',
  styleUrls: ['./ui-element-widget.component.scss']
})
export class UiElementWidgetComponent implements OnInit {

  @Input() widget: Widget;
  @Input() isExpanded = false;


  @HostBinding('class.border-right-danger') get removedFromApi() {
    return !!this.widget.profiles.find((p) => p.removed_from_api);
  }

  @HostBinding('class.border-left-success') get identityDefining() {
    return !this.widget.propertyField ? false : (this.widget.propertyField.property.identity_defining && this.widget.propertyField.isOutgoing);
  }

  constructor() { }

  ngOnInit() {
  }

}
