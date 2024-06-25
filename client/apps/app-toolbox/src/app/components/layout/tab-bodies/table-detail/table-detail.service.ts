import { Injectable } from '@angular/core';
import type { TableDetailComponent } from './table-detail.component';

@Injectable()
export class TableDetailService {

  component: TableDetailComponent;

  registerComponent(component: TableDetailComponent) { this.component = component }

}
