import { Injectable } from '@angular/core';
import type { ViewFieldAnnotationsOfCellComponent } from './view-field-annotations-of-cell.component';

@Injectable()
export class ViewFieldAnnotationsOfCellService {

  component: ViewFieldAnnotationsOfCellComponent;

  registerComponent(component: ViewFieldAnnotationsOfCellComponent) { this.component = component }

}
