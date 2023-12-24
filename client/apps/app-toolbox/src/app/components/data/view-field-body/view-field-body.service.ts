import { Injectable } from '@angular/core';
import type { ViewFieldBodyComponent } from './view-field-body.component';

@Injectable()
export class ViewFieldBodyService {

  component: ViewFieldBodyComponent;

  registerComponent(component: ViewFieldBodyComponent) { this.component = component }

}
