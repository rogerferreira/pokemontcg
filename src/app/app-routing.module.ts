import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateDecksComponent} from "./create-decks/create-decks.component";
import {MyDecksComponent} from "./my-decks/my-decks.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateDecksComponent },
  { path: 'list', component: MyDecksComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
