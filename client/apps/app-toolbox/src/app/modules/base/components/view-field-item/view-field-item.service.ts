import { Injectable } from '@angular/core';
import type { ViewFieldItemComponent } from './view-field-item.component';

@Injectable()
export class ViewFieldItemService {

  component: ViewFieldItemComponent;

  registerComponent(component: ViewFieldItemComponent) { this.component = component }

}
