import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/employee/service/user.service';
import { DemandeState } from 'src/app/models/demandestate';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';

@Component({
  selector: 'app-demande-cloturee',
  templateUrl: './demande-cloturee.component.html',
  styleUrls: ['./demande-cloturee.component.css']
})
export class DemandeClotureeComponent implements OnInit {

  p: number = 1;
 
  constructor(public serviceDemandeState: DemandeStateServiceService , public serviceUser: UserService, 
) { }

  ngOnInit() {
    // if (this.serviceUser.user.libelleRole == "Demandeur" || this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
    //   this.serviceDemandeState.GetListStateDemandeByRole("Cloturer", "Demandeur", "Cloturer").subscribe(res => {
    //     this.serviceDemandeState.ListStateDemandeCloturee = res as DemandeState[];
    //   })
    // }

    // if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
    //   this.serviceDemandeState.GetListStateDemandeByRole("Cloturer", "Validateur Filiale Financier", "Cloturer").subscribe(res => {
    //     this.serviceDemandeState.ListStateDemandeCloturee = res as DemandeState[];
    //   })
    // }

    // if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
    //   this.serviceDemandeState.GetListStateDemandeByRole("Cloturer", "Directeur Filiale", "Cloturer").subscribe(res => {
    //     this.serviceDemandeState.ListStateDemandeCloturee = res as DemandeState[];
    //   })
    // }

   // if (this.serviceUser.user.libelleRole == "Directeur Siege") {
      this.serviceDemandeState.GetListStateDemandeByRole("Cloturer", "Directeur Siege", "Cloturer").subscribe(res => {
        this.serviceDemandeState.ListStateDemandeCloturee = res as DemandeState[];
      })
   // }
  }


}
