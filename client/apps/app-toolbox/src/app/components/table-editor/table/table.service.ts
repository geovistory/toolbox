import { Injectable } from '@angular/core';
import type { TableComponent } from './table.component';

@Injectable()
export class TableService {

  component: TableComponent;

  registerComponent(component: TableComponent) { this.component = component }

}
