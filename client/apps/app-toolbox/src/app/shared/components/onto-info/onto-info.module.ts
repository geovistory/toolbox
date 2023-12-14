import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClassInfoComponent } from './class-info/class-info.component';
import { OntoClassInfoComponent } from './onto-class-info/onto-class-info.component';
import { OntoPropertyInfoComponent } from './onto-property-info/onto-property-info.component';


const comonents = [OntoClassInfoComponent, OntoPropertyInfoComponent, ClassInfoComponent]
@NgModule({
    exports: comonents,
    imports: [
        CommonModule,
        MatTooltipModule,
        MatIconModule,
        ...comonents
    ]
})
export class OntoInfoModule { }
