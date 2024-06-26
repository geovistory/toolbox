import { Injectable } from '@angular/core';
import type { ViewFieldComponent } from './view-field.component';

@Injectable()
export class ViewFieldService {

  component: ViewFieldComponent;

  registerComponent(component: ViewFieldComponent) { this.component = component }

}
