import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSandboxComponent } from './project-sandbox.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ProjectSandboxComponent
    ],
    exports: [
        ProjectSandboxComponent
    ]
})
export class ProjectSandboxModule { }
