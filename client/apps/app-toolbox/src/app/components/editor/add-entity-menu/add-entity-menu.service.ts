import { Injectable } from '@angular/core';
import type { AddEntityMenuComponent } from './add-entity-menu.component';

@Injectable()
export class AddEntityMenuService {

  component: AddEntityMenuComponent;

  registerComponent(component: AddEntityMenuComponent) { this.component = component }

}
