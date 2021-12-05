import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/employee/service/user.service';
import { DemandeState } from 'src/app/models/demandestate';
import { User } from 'src/app/models/user';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';
import { Employee } from '../../employee/service/employee';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent implements OnInit {
  imageValue: any;
  nameUser: any;

  valDde: number=0;
  //valValidateurFilialeFinancier: number=0;
  ///valDirecteurFiliale: number=0;
 // valValidateurSiegeFinancier: number=0;
 // valDirecteurSiege: number=0;

  constructor(public serviceUser :UserService , public  serviceDemandeState: DemandeStateServiceService ) { }


//  this.nameUser = this.serviceUser.user;
  
  ngOnInit(): void {
    this.nameUser= this.serviceUser.user;
   
  }
   refresh(){
    if(this.serviceUser.user.libelleRole == "Demandeur" || this.serviceUser.user.libelleRole=="Validateur Filiale Financier"  ){
      this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Demandeur" , "En Cours").subscribe(res => {
this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
this.valDde= this.serviceDemandeState.ListStateDemandeByRole.length
      })
    }

    if( this.serviceUser.user.libelleRole=="Directeur Filiale"  ){
      this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Filiale Financier" , "En Cours").subscribe(res => {
this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
this.valDde= this.serviceDemandeState.ListStateDemandeByRole.length
      })
    }

    if( this.serviceUser.user.libelleRole=="Validateur Siege Financier"  ){
      this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Directeur Filiale" , "En Cours").subscribe(res => {
this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
this.valDde= this.serviceDemandeState.ListStateDemandeByRole.length
      })
    }

    if( this.serviceUser.user.libelleRole=="Directeur Siege"  ){
      this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Siege Financier" , "En Cours").subscribe(res => {
this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
this.valDde= this.serviceDemandeState.ListStateDemandeByRole.length
      })
    }
   }

}
