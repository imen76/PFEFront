import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/models/demande';
import { DemandeService } from 'src/app/services/demande.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/employee/service/user.service';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';
import { DemandeState } from 'src/app/models/demandestate';


export class categorie {
  constructor(
    public categorieId: number,
    public typeCat: string,

  ) {
  }
}

export class mode {
  constructor(
    public modeId: number,
    public designation: string,

  ) {
  }
}
@Component({
  selector: 'app-nouvelle-demande',
  templateUrl: './nouvelle-demande.component.html',
  styleUrls: ['./nouvelle-demande.component.css']
})
export class NouvelleDemandeComponent implements OnInit {

  submitted = false;
 
  modes: mode[]
  categories: categorie[]
  selectedCategories: number;


  constructor(private formBuilder: FormBuilder, public demandeService: DemandeService,
    private route: ActivatedRoute, private http: HttpClient, public serviceUser: UserService,
    public serviceDemandeState: DemandeStateServiceService ,  private router: Router) {

  }

  ngOnInit() {
    //this.initializeForm();
    this.getCategories();
    this.getModes();


  }

  getCategories() {
    this.http.get<any>('http://localhost:50599/api/Categorie/GetListCategorie').subscribe(
      response => {
        console.log(response);
        this.categories = response;
        console.log(this.categories);

      }
    );
  }
  getModes() {
    this.http.get<any>('http://localhost:50599/api/Mode/GetListMode').subscribe(
      response => {
        console.log(response);
        this.modes = response;

      }
    );
  }

  selectType(event: any): void {
    this.demandeService.addDemandeForm.patchValue({
      typeDemandes: event.target.value
    });

  }

  onSubmit() {
    this.demandeService.addDemandeForm.controls.IsActive.setValue(true)
    this.demandeService.create(this.demandeService.addDemandeForm.value).subscribe(res => {
      //  debugger
      this.demandeService.demande = res as Demande;
      this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("En Cours")
      this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(this.demandeService.addDemandeForm.controls.Comment.value)
      this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(this.demandeService.demande.demandeId)
      this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(this.demandeService.addDemandeForm.controls.FKUser.value)

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
        this.serviceDemandeState.ResetDemandeState();
        this.router.navigateByUrl('/listeDemandes');

      })
    })

    // this.demandeService.create(this.addDemandeForm.value)
    // .subscribe(
    //   response => {
    //     console.log(response);
    //     this.submitted = true;

    //     this.addDemandeForm.reset({
    //       DateDemande:'',
    //       labelDemande:'',
    //       Lieu:'',
    //       Partie1:this.serviceUser.user.labelSubsidary,
    //       Partie2:'',
    //       FKCategorie :'',
    //       FKMode: '',
    //       FKUser: this.serviceUser.user.userId,
    //       Montant:0,
    //       Comment : ''
    //     });
    //   },
    //   error => {
    //     console.log(error,"swwwwwwwwwwwwwwwwwwww");
    //   });
  }

  onSubmitbrouillon() {
    this.demandeService.addDemandeForm.controls.IsActive.setValue(true)
    this.demandeService.create(this.demandeService.addDemandeForm.value).subscribe(res => {
      //  debugger
      this.demandeService.demande = res as Demande;
      this.serviceDemandeState.addDemandeStateForm.controls.stateDemande.setValue("Brouillon")
      this.serviceDemandeState.addDemandeStateForm.controls.comment.setValue(this.demandeService.addDemandeForm.controls.Comment.value)
      this.serviceDemandeState.addDemandeStateForm.controls.fkDemande.setValue(this.demandeService.demande.demandeId)
      this.serviceDemandeState.addDemandeStateForm.controls.fkUser.setValue(this.demandeService.addDemandeForm.controls.FKUser.value)

      this.serviceDemandeState.AddDemandeState().subscribe(res1 => {
        this.serviceDemandeState.ListStateDemandeByRole = res1 as DemandeState[];
        if (this.serviceUser.user.libelleRole == "Demandeur" || this.serviceUser.user.libelleRole == "Validateur Filiale Financier") {
          // this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Demandeur", "En Cours").subscribe(res => {
          //   this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          // })
        }

        if (this.serviceUser.user.libelleRole == "Directeur Filiale") {
          // this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Filiale Financier", "En Cours").subscribe(res => {
          //   this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          // })
        }

        if (this.serviceUser.user.libelleRole == "Validateur Siege Financier") {
          // this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Directeur Filiale", "En Cours").subscribe(res => {
          //   this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          // })
        }

        if (this.serviceUser.user.libelleRole == "Directeur Siege") {
          // this.serviceDemandeState.GetListStateDemandeByRole("En Cours", "Validateur Siege Financier", "En Cours").subscribe(res => {
          //   this.serviceDemandeState.ListStateDemandeByRole = res as DemandeState[];
          // })
        }
        this.demandeService.ResetDemande();
        this.serviceDemandeState.ResetDemandeState();
        this.router.navigateByUrl('/listeDemandes');

      })
    })

    // this.demandeService.create(this.addDemandeForm.value)
    // .subscribe(
    //   response => {
    //     console.log(response);
    //     this.submitted = true;

    //     this.addDemandeForm.reset({
    //       DateDemande:'',
    //       labelDemande:'',
    //       Lieu:'',
    //       Partie1:this.serviceUser.user.labelSubsidary,
    //       Partie2:'',
    //       FKCategorie :'',
    //       FKMode: '',
    //       FKUser: this.serviceUser.user.userId,
    //       Montant:0,
    //       Comment : ''
    //     });
    //   },
    //   error => {
    //     console.log(error,"swwwwwwwwwwwwwwwwwwww");
    //   });
  }



}
