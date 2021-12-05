import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PageSignInComponent } from '../components/page-sign-in/page-sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLayoutComponent } from '../components/page-layout/page-layout.component';
import { DetailsComponent } from '../pages/demande/list-demandes/details/details.component';
 import { PageSignUpComponent } from '../components/page-sign-up/page-sign-up.component';
import { PageResetPasswordComponent } from '../components/page-reset-password/page-reset-password.component';
import { NouvelleDemandeComponent } from '../pages/demande/nouvelle-demande/nouvelle-demande.component';
import { ModifierDemandeComponent } from '../pages/demande/modifier-demande/modifier-demande.component';
   
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
import { HttpClientModule } from '@angular/common/http';
 



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
import { EmployeeComponent } from '../employee/employee.component';
import { AddEmployerComponent } from '../employee/add-employer/add-employer.component';
import { ListEmployerComponent } from '../employee/list-employer/list-employer.component';
import { ModalModule } from 'ngb-modal';
import { ListecontratsComponent } from '../ia-compare/listecontrats/listecontrats.component';
import { NouveaucontratComponent } from '../ia-compare/nouveaucontrat/nouveaucontrat.component';
import { VerifconformiteComponent } from '../ia-compare/verifconformite/verifconformite.component';
import { ContratClientComponent } from '../ia-compare/contrat-client/contrat-client.component';
import { FormPageComponent } from '../pages/form-page/form-page.component';
import { StepTemplateComponent } from '../components/step-template/step-template.component';
import { ParametresComponent } from '../pages/demande/parametres/parametres.component';
import { ResultCompareComponent } from '../ia-compare/result-compare/result-compare.component';
import { MatSortModule } from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatGridListModule, ɵangular_material_src_material_grid_list_grid_list_a} from '@angular/material/grid-list';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SimpleaddComponent } from 'src/app/pages/simpleadd/simpleadd.component';
import { UsersComponent } from '../users/users.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { DemandeReviseeComponent } from '../pages/demande/list-demandes/DemandeReviser/demande-revisee/demande-revisee.component';
import { DemandeAccepterComponent } from '../pages/demande/list-demandes/DemandeAcceptee/demande-accepter/demande-accepter.component';
import { DemandeClotureeComponent } from '../pages/demande/demande-cloturee/demande-cloturee.component';

   
const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [
    PageSignInComponent,
    PageLayoutComponent,
    DetailsComponent,
     PageSignUpComponent,
    PageResetPasswordComponent,
    NouvelleDemandeComponent,
    ModifierDemandeComponent,
    EmployeeComponent,
    AddEmployerComponent,
    ListEmployerComponent,
    ListecontratsComponent,
    NouveaucontratComponent,
    VerifconformiteComponent,
    ContratClientComponent,
    FormPageComponent,
    StepTemplateComponent,
    ParametresComponent,
    ResultCompareComponent,
    DashboardComponent,
    SimpleaddComponent,
    UsersComponent,
    DemandeReviseeComponent,
    DemandeAccepterComponent,
    DemandeClotureeComponent
   ],
   
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA
   ],
  imports: [
        AngularWeatherWidgetModule,
        HttpClientModule,

    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
     //
      FormsModule,
     ReactiveFormsModule,
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
     MatCheckboxModule,
     MatSelectModule,
     MatSnackBarModule,
     MatTableModule,
     CdkTableModule,
     MatPaginatorModule,
     ModalModule,
      NgxPaginationModule,
     Ng2SearchPipeModule,
     MatGridListModule,
     NgSelectModule

  ],
  exports: [
    PageSignInComponent,
    PageLayoutComponent,
    DetailsComponent,
     PageSignUpComponent,
    PageResetPasswordComponent,
    NouvelleDemandeComponent,
    ModifierDemandeComponent,
    EmployeeComponent,
    AddEmployerComponent,
    ListEmployerComponent,
    ListecontratsComponent,
    NouveaucontratComponent,
    VerifconformiteComponent,
    ContratClientComponent,
    FormPageComponent,
    StepTemplateComponent,
    ResultCompareComponent,
    DashboardComponent,
    SimpleaddComponent,
    NgSelectModule
    
   ]
})

export class AuthModule { }

