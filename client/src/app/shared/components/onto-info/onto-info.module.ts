import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntoPropertyInfoComponent } from './onto-property-info/onto-property-info.component';
import { OntoClassInfoComponent } from './onto-class-info/onto-class-info.component';


const comonents = [OntoClassInfoComponent, OntoPropertyInfoComponent]
@NgModule({
  declarations: comonents,
  exports: comonents,
  imports: [
    CommonModule
  ]
})
export class OntoInfoModule { }
