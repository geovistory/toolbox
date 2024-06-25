import { Injectable } from '@angular/core';
import type { TextDetailComponent } from './text-detail.component';

@Injectable()
export class TextDetailService {

  component: TextDetailComponent;

  registerComponent(component: TextDetailComponent) { this.component = component }

}
