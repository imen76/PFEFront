import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/employee/service/user.service';
import { Demande } from 'src/app/models/demande';
import { DemandeState } from 'src/app/models/demandestate';
import { DemandeStateServiceService } from 'src/app/services/demande-state-service.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande-accepter',
  templateUrl: './demande-accepter.component.html',
  styleUrls: ['./demande-accepter.component.css']
})
export class DemandeAccepterComponent implements OnInit {


  p: number = 1;
  newList: DemandeState[] = new Array();
  constructor(private http: HttpClient,public demandeService: DemandeService, 
    public serviceDemandeState: DemandeStateServiceService , public serviceUser: UserService) { }



  ngOnInit() {
      // this.serviceDemandeState.GetHistoriqueStateDemande(this.serviceDemandeState.formHistorique.controls.fkDemande.value).subscribe(res => {
      //   this.serviceDemandeState.HistoriqueStateDemande = res as DemandeState[];
      // })

      this.serviceDemandeState.GetListDemandeDistinct().subscribe(res=>{
        this.newList = res as DemandeState[]})
  }

  GetList(){
    if(this.serviceDemandeState.formHistorique.controls.fkDemande.value){
      this.serviceDemandeState.GetHistoriqueStateDemande(this.serviceDemandeState.formHistorique.controls.fkDemande.value).subscribe(res => {
        this.serviceDemandeState.HistoriqueStateDemande = res as DemandeState[];
      })
    }
    else{
      this.serviceDemandeState.HistoriqueStateDemande = new Array()
    }
     
  }


}
