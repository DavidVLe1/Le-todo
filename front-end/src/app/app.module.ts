import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NamesComponent } from './names/names.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {TodoListComponentComponent} from "./todo-list-component/todo-list-component.component";

@NgModule({
  declarations: [
    AppComponent,
    NamesComponent,
    TodoListComponentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
