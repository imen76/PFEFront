import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageResetPasswordComponent } from '../components/page-reset-password/page-reset-password.component';
import { PageSignInComponent } from '../components/page-sign-in/page-sign-in.component';
import { PageSignUpComponent } from '../components/page-sign-up/page-sign-up.component';
import { StepTemplateComponent } from '../components/step-template/step-template.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddEmployerComponent } from '../employee/add-employer/add-employer.component';
import { EmployeeComponent } from '../employee/employee.component';
import { ListEmployerComponent } from '../employee/list-employer/list-employer.component';
import { ContratClientComponent } from '../ia-compare/contrat-client/contrat-client.component';
import { ListecontratsComponent } from '../ia-compare/listecontrats/listecontrats.component';
import { NouveaucontratComponent } from '../ia-compare/nouveaucontrat/nouveaucontrat.component';
import { ResultCompareComponent } from '../ia-compare/result-compare/result-compare.component';
import { VerifconformiteComponent } from '../ia-compare/verifconformite/verifconformite.component';
import { DetailsComponent } from '../pages/demande/list-demandes/details/details.component';
import { ModifierDemandeComponent } from '../pages/demande/modifier-demande/modifier-demande.component';
import { NouvelleDemandeComponent } from '../pages/demande/nouvelle-demande/nouvelle-demande.component';
import { ParametresComponent } from '../pages/demande/parametres/parametres.component';
import { FormPageComponent } from '../pages/form-page/form-page.component';
import { SimpleaddComponent } from '../pages/simpleadd/simpleadd.component';
import { RoleAdminDemandeurGuard } from './role-admin-demandeur.guard';
import { RoleAdminGuard } from './role-admin.guard';
import { RoleGuardDemandeurGuard } from './role-guard-demandeur.guard';
import { RoleGuardGuard } from './role-guard.guard';

import { UsersComponent } from '../users/users.component';
import { DemandeReviseeComponent } from '../pages/demande/list-demandes/DemandeReviser/demande-revisee/demande-revisee.component';
import { DemandeAccepterComponent } from '../pages/demande/list-demandes/DemandeAcceptee/demande-accepter/demande-accepter.component';
import { DemandeBrouillonComponent } from '../pages/demande/demande-brouillon/demande-brouillon.component';
import { DemandeClotureeComponent } from '../pages/demande/demande-cloturee/demande-cloturee.component';


const routes: Routes = [
  {component: PageSignInComponent, path: 'PageSignIn'},
  {component: DetailsComponent, path: 'listeDemandes'},
  {component: DemandeReviseeComponent, path: 'DemandeRevisee'},
  {component: PageResetPasswordComponent, path: 'PageResetPassword'},
  {component: PageSignUpComponent, path: 'PageSignUp'},
  {component: NouvelleDemandeComponent, path: 'add',canActivate:[RoleAdminDemandeurGuard]},
  {component: ModifierDemandeComponent, path: 'update',canActivate:[RoleAdminDemandeurGuard]},
  {component: EmployeeComponent, path: 'employer'},
  {component: AddEmployerComponent, path: 'addEmployer',canActivate:[RoleAdminGuard]},
  {component: ListEmployerComponent, path:'listEmployer',canActivate:[RoleAdminGuard]},
  {component: ListecontratsComponent, path: 'listeContrats',canActivate:[RoleGuardGuard]},
  {component: NouveaucontratComponent, path: 'nouveauContrat',canActivate:[RoleGuardGuard]},
  {component: VerifconformiteComponent, path: 'verifierConformite',canActivate:[RoleGuardGuard]},
  {component: FormPageComponent, path: 'form',canActivate:[RoleAdminDemandeurGuard]},
  {component: StepTemplateComponent, path: 'step', canActivate:[RoleAdminDemandeurGuard]},
  {component: ParametresComponent, path: 'parametres',canActivate:[RoleAdminGuard]},
  {component: ContratClientComponent, path: 'ContratClient',canActivate:[RoleGuardGuard]},
  {component: ResultCompareComponent, path: 'ResultCompare', canActivate:[RoleGuardGuard]},
  {component: DashboardComponent, path: 'home', canActivate:[]},
  {component: SimpleaddComponent, path:'ajouterétape'},
  {component: UsersComponent, path: 'users'},
  {component: AddEmployerComponent, path: 'add-employer'},
  {component: DemandeAccepterComponent, path: 'Historique'},
  {component: DemandeBrouillonComponent, path: 'list-DemandeBrouillon'},
  {component: DemandeClotureeComponent, path: 'list-DemandeCloturee'}

];

@NgModule({
  declarations:[
    ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
