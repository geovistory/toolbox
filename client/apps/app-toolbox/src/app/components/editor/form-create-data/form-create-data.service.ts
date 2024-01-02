import { Injectable } from '@angular/core';
import type { FormCreateDataComponent } from './form-create-data.component';

@Injectable()
export class FormCreateDataService {

  component: FormCreateDataComponent;

  registerComponent(component: FormCreateDataComponent) { this.component = component }

}
