import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NamesComponent} from "./names/names.component";
import {TodoListComponentComponent} from "./todo-list-component/todo-list-component.component";

const routes: Routes = [
  {path: 'names', component: NamesComponent},
  {path: 'todo-list-component', component:TodoListComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
