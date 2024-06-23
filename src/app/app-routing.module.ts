import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateDecksComponent} from "./create-decks/create-decks.component";
import {MyDecksComponent} from "./my-decks/my-decks.component";
import {sessionStoreGuard} from "./guards/session-store.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: MyDecksComponent, canActivate: [sessionStoreGuard] },
  { path: 'create', component: CreateDecksComponent, canActivate: [sessionStoreGuard] },
  { path: 'update/:id', component: CreateDecksComponent, canActivate: [sessionStoreGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
