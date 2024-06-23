import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { MyDecksComponent } from './my-decks/my-decks.component';
import { CreateDecksComponent } from './create-decks/create-decks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {IgxInputGroupModule, IgxSelectModule} from "igniteui-angular";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyDecksComponent,
    CreateDecksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IgxInputGroupModule,
    IgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
