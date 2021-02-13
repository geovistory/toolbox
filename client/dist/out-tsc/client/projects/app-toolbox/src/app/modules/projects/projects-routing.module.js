import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformationModule } from '../information/information.module';
import { SourcesModule } from '../sources';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
export function getInformation2Module() { return InformationModule; }
;
export function getSourcesModule() { return SourcesModule; }
;
const routes = [
    {
        path: '',
        component: ProjectListComponent,
    },
    {
        path: 'create',
        component: ProjectCreateComponent
    },
    {
        path: ':pkActiveProject',
        redirectTo: ':pkActiveProject/edit',
        pathMatch: 'full',
    },
    {
        path: ':pkActiveProject/edit',
        component: ProjectEditComponent
    },
];
let ProjectsRoutingModule = class ProjectsRoutingModule {
};
ProjectsRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProjectsRoutingModule);
export { ProjectsRoutingModule };
//# sourceMappingURL=projects-routing.module.js.map