import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
   import { BrowserModule } from '@angular/platform-browser';
 import { PageSignInComponent } from './components/page-sign-in/page-sign-in.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  // {path:"NouvelleDemande",component:NouvelleDemandeComponent},
  // {path:"details",component:DetailsComponent},
  // {path:"add",component:AddDemandeComponent},
  {component: PageSignInComponent, path: "PageSignIn"},
  {path: "", redirectTo: "/PageSignIn", pathMatch: "full"},
 
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
