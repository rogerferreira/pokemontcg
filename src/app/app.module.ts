import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyDecksComponent } from './my-decks/my-decks.component';
import { CreateDecksComponent } from './create-decks/create-decks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyDecksComponent,
    CreateDecksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
