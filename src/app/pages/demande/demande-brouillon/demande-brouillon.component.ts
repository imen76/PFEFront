import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/employee/service/user.service';
import { DemandeState } from 'src/app/models/demandestate';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande-brouillon',
  templateUrl: './demande-brouillon.component.html',
  styleUrls: ['./demande-brouillon.component.css']
})
export class DemandeBrouillonComponent implements OnInit {

  p: number = 1;
 
  constructor(public serviceDemandeState: DemandeStateServiceService , public serviceUser: UserService, 
    private demandeService: DemandeService,
    private router: Router) { }

  ngOnInit() {
      if (this.serviceUser.user.libelleRole == "Demandeur") {
        this.serviceDemandeState.GetListStateDemandeByRole("Brouillon", "Demandeur", "Brouillon").subscribe(res => {
          this.serviceDemandeState.listBrouillon = res as DemandeState[];
        })
     }
  }

  onAccept(demande: DemandeState) {
    this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(demande.idDemandeState)

    this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue(demande.stateDemande)
    this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(demande.comment)
    this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
    this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(demande.fkUser)
    this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(false);
    this.serviceDemandeState.addDemandeStateForm.controls.isActive.setValue(false);
    this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(false);
    this.serviceDemandeState.UpdateDemandeState().subscribe(res1 => {
      this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];

      this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(0)
       this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
      this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(this.serviceDemandeState.formComment.controls.comment.value)
      this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
      this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(this.serviceUser.user.userId)
      this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(false);
      this.serviceDemandeState.addDemandeStateForm.controls.isActive.setValue(true);
    

      this.serviceDemandeState.AddDemandeState().subscribe(res1 => {
        this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];
        if (this.serviceUser.user.libelleRole == "Demandeur" || this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Demandeur", "En Cours").subscribe(res => {
            this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          })
        }

        if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
          this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Filiale Financier", "En Cours").subscribe(res => {
            this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          })
        }

        if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Directeur Filiale", "En Cours").subscribe(res => {
            this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          })
        }

        if (this.serviceUser.user.libelleRole == "Directeur Siege") {
          this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Siege Financier", "En Cours").subscribe(res => {
            this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          })
        }
        this.demandeService.ResetDemande();
        this.serviceDemandeState.formComment.controls.comment.setValue("")
        this.serviceDemandeState.ResetDemandeState();
        this.router.navigateByUrl('/listeDemandes');


      })


    })





  }


}
