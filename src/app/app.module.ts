import { NgModule } from '@angular/core';
import { ModalModule } from 'ngb-modal';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
  

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { PageLoadingComponent } from './page-loading/page-loading.component'; 
import { AuthModule } from './auth/auth.module';
import { ModifierDemandeComponent } from './pages/demande/modifier-demande/modifier-demande.component';
 
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultCompareComponent } from './ia-compare/result-compare/result-compare.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DemandeBrouillonComponent } from './pages/demande/demande-brouillon/demande-brouillon.component';





 
   const routes: Routes = [
  {
      path: '',
   }
];

@NgModule({
  declarations: [
    AppComponent,
    // HeaderNavbarComponent,
    // SidebarLeftComponent,
    // AddDemandeComponent,
    // EditDemandeComponent,
    // DeleteDemandeComponent,
    PageLoadingComponent,
    DemandeBrouillonComponent,
  //  DemandeClotureeComponent,
    
    
      ],
  imports: [
    ModalModule,
    // BrowserModule,
    // AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    // DemandeModule,
     // BrowserAnimationsModule,
    // ToastrModule.forRoot(),
     ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule, 
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    AngularWeatherWidgetModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
