import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./components/main/main.component";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { ClassComponent } from "./components/class/class.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'classes',
        component: ClassListComponent
      },
      {
        path: 'classes/:id',
        component: ClassComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }