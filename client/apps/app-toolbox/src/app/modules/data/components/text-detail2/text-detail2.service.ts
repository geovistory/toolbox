import { Injectable } from '@angular/core';
import type { TextDetail2Component } from './text-detail2.component';

@Injectable()
export class TextDetail2Service {

  component: TextDetail2Component;

  registerComponent(component: TextDetail2Component) { this.component = component }

}
