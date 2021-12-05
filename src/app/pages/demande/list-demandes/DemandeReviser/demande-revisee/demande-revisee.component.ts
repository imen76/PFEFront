import { Component, OnInit, Input } from '@angular/core';
import { DemandeService } from 'src/app/services/demande.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';
import { HttpClient } from '@angular/common/http';
import { Demande } from 'src/app/models/demande';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectorMatcher } from '@angular/compiler';
import { DemandeState } from 'src/app/models/demandestate';
import { UserService } from 'src/app/employee/service/user.service';


@Component({
  selector: 'app-demande-revisee',
  templateUrl: './demande-revisee.component.html',
  styleUrls: ['./demande-revisee.component.css']
})
export class DemandeReviseeComponent implements OnInit {
  p: number = 1;

  constructor(private demandeService: DemandeService,
    private router: Router, private http: HttpClient, private modalService: NgbModal,
    private fb: FormBuilder, public serviceDemandeState: DemandeStateServiceService, public serviceUser: UserService) {

  }

  ngOnInit() {
   // debugger
    if (this.serviceUser.user.libelleRole == "Demandeur") {
      this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Filiale Financier", "Reviser").subscribe(res => {
        this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
      })
    }

    if (this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
      this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Directeur Filiale", "Reviser").subscribe(res => {
        this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
      })
    }



    if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
      this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
        this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
      })
    }

    if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
      this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
        this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
      })
    }




  }

  
  onAccept(demande: DemandeState) {
 
    // this.addDemandeForm.controls.IsActive.setValue(true)
    //  this.demandeService.create(this.addDemandeForm.value).subscribe(res => {
    //  debugger
    //  this.demandeService.demande = res as Demande;
    // this.demandeService.ResetDemande();

    //  this.serviceDemandeState.ResetDemandeState()

    this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(demande.idDemandeState)

    this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue(demande.stateDemande)
    this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(demande.comment)
    this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
    this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(demande.fkUser)
    this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(true);
    //this.serviceDemandeState.addDemandeStateForm.controls.isActive.setValue(true);
    this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(false);
    this.serviceDemandeState.UpdateDemandeState().subscribe(res1 => {
      this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];

      this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(0)
      // this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
      this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(this.serviceDemandeState.formComment.controls.comment.value)
      this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
      this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(this.serviceUser.user.userId)
      this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(false);
      this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
      //this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(false);

      if(this.serviceUser.user.libelleRole == 'Directeur Siege'){
        this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Cloturer")
      }
    

      this.serviceDemandeState.AddDemandeState().subscribe(res1 => {
        this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];
        if (this.serviceUser.user.libelleRole == "Demandeur") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Filiale Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        if (this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Directeur Filiale", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
    
    
        if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        this.demandeService.ResetDemande();
        this.serviceDemandeState.formComment.controls.comment.setValue("")
        this.serviceDemandeState.ResetDemandeState();
        this.router.navigateByUrl('/DemandeRevisee');


      })


    })





  }


  onRevise(demande: DemandeState) {
debugger
    this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(demande.idDemandeState)

    this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
    this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(demande.comment)
    this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
    this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(demande.fkUser)
    this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(false);
    //this.serviceDemandeState.addDemandeStateForm.controls.isActive.setValue(true);
    this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(true);
    this.serviceDemandeState.UpdateDemandeState().subscribe(res1 => {
      this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];

      this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(0)
      // this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
      this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(this.serviceDemandeState.formComment.controls.comment.value)
      this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(demande.fkDemande)
      this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(this.serviceUser.user.userId)
   //   this.serviceDemandeState.addDemandeStateForm.controls.isAccepted.setValue(false);
      this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(false);

      // if(this.serviceUser.user.libelleRole == 'Directeur Siege'){
      //   this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Cloturer")
      // }
      this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Reviser")

      this.serviceDemandeState.AddDemandeState().subscribe(res1 => {
        this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];
        if (this.serviceUser.user.libelleRole == "Demandeur") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Filiale Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        if (this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Directeur Filiale", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
    
    
        if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
          this.serviceDemandeState.GetListStateDemandeByRole("Reviser", "Validateur Siege Financier", "Reviser").subscribe(res => {
            this.serviceDemandeState.listeDemandeStateReviser = res as DemandeState[];
          })
        }
    
        this.demandeService.ResetDemande();
        this.serviceDemandeState.formComment.controls.comment.setValue("")
        this.serviceDemandeState.ResetDemandeState();
        this.router.navigateByUrl('/DemandeRevisee');


      })


    })





  }


}
