import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./components/main/main.component";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { ClassComponent } from "./components/class/class.component";
import { ClassUiContextComponent } from "./components/class-ui-context/class-ui-context.component";
import { NamespaceListComponent } from "./components/namespace-list/namespace-list.component";


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
        path: 'classes/:pk_class',
        component: ClassComponent,
        children: [
          {
            path: 'ui-context/:pk_ui_context',
            component: ClassUiContextComponent,
          }
        ]
      },
      {
        path: 'namespaces',
        component: NamespaceListComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }