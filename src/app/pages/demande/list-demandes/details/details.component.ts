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


// export class categorie {
//   constructor(
//     public categorieId: number,
//     public typeCat: string,

//   ) {
//   }
// }

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // categories: categorie[]
  lieu: any;
  demandeState: string;
  closeResult: string;
  editForm: FormGroup;
  config: any;
  p: number = 1;

  

  @Input()
  demandes!: Demande[];
  demande: Demande;
  demandeStateServiceService: any;
  snackBar: any;


  constructor(private demandeService: DemandeService,
    private router: Router, private http: HttpClient, private modalService: NgbModal,
    private fb: FormBuilder, public serviceDemandeState: DemandeStateServiceService, public serviceUser: UserService) {

  }



  totalLength: any;

  sum: any;


  ngOnInit() {
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

    // this.demandeService.getAllDemandes().subscribe(data => {
    //   this.demandes = data;
    //   this.totalLength = data.length;
    //   // this.getCategories(); 

    //   this.sum =  this.totalLength = data.length; 
    // })

    this.editForm = this.fb.group({
      demandeId: [''],
      typeDemande: [''],
      dateDemande: [''],
      lieu: [''],
      partie1: [''],
      partie2: [''],
      // categorie: [''],
      CurrentState: [''],

    }
    );


  }

  // getCategories(){
  //   this.http.get<any>('https://localhost:44324/api/Categorie/GetListCategorie').subscribe(
  //     response => {
  //       console.log(response);
  //       this.categories = response;
  //       console.log(this.categories);

  //     }
  //   );
  // }

  onAccept(demande: DemandeState) {
 
    // this.addDemandeForm.controls.IsActive.setValue(true)
    //  this.demandeService.create(this.addDemandeForm.value).subscribe(res => {
    //  debugger
    //  this.demandeService.demande = res as Demande;
    // this.demandeService.ResetDemande();

    //  this.serviceDemandeState.ResetDemandeState()

    this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(demande.idDemandeState)

    this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
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
      //this.serviceDemandeState.addDemandeStateForm.controls.isModified.setValue(false);

      if(this.serviceUser.user.libelleRole == 'Directeur Siege'){
        this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Cloturer")
      }
    

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


  onRevise(demande: DemandeState) {
debugger
    this.serviceDemandeState.addDemandeStateForm.controls.idDemandeState.setValue(demande.idDemandeState)

    this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Reviser")
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


  InitFormForEdit(demande: Demande) {

    this.demandeService.demandeForm.patchValue({

      DemandeId: demande.demandeId,
      TypeDemande: demande.typeDemande,
      DateDemande: demande.dateDemande,
      Lieu: demande.lieu,
      Partie1: demande.partie1,
      Partie2: demande.partie2,

      // CurrentState : demande.currentState
      // TypeContact: demande.typeContact,
      // Filiale : demande.filiale,
      // ContactName : demande.contactName, 

    })
  }


  // pageChange(event:any){
  //   this.config.currentPage = event;
  // }



  // onEdit(targetModal: any,demde:demande){

  //   this.modalService.open(targetModal, {
  //     backdrop: 'static',
  //   });
  //   this.InitFormForEdit(demde);
  // }

  OnDelete() {
    //   this.demandeService.OnDelete(id)
    //     .subscribe(data => { this.ngOnInit(); })
    // }
    // OnModif(id: number, demande: Demande) {
    //   this.demandeService.OnModif(id, demande)
    //     .subscribe(data => { this.ngOnInit(); })
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openEdit(targetModal: any, demande: Demande) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({

      demandeId: demande.demandeId,
      typeDemande: demande.typeDemande,
      dateDemande: demande.dateDemande,
      lieu: demande.lieu,
      partie1: demande.partie1,
      partie2: demande.partie2

      // TypeContact: demande.typeContact,
      // Filiale : demande.filiale,
      // ContactName : demande.contactName

    });

  }

  onSave() {
    const editURL = 'http://localhost:50599/api/Demande/PutDemande?id' + this.editForm.value.id;
    //console.log(this.editForm.value);
    this.http.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });

  }

  Search() {
    if (this.lieu == "") {
      this.ngOnInit();
    }
    else {
      this.demandes = this.demandes.filter(res => {
        return res.partie2.toLocaleLowerCase().match(this.lieu.toLocaleLowerCase());
      });
    }
  }




}





