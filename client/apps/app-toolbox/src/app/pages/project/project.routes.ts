import { Routes } from '@angular/router';
import { ProjectEditComponent } from './project-edit/project-edit.component';

export const PROJECT_ROUTES: Routes = [
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
