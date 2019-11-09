import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFactoryService } from './services/form-factory.service';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PortalModule],
  providers: [FormFactoryService]
})
export class FormFactoryModule { }
