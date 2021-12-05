import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {DemandeState } from 'src/app/models/demandestate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeStateServiceService {
  listeDemandeState: DemandeState[] = new Array();
  ListStateDemandeByRole: DemandeState[] = new Array();
  HistoriqueStateDemande: DemandeState[] = new Array();
  listeDemandeStateReviser: DemandeState[] = new Array();
  listBrouillon: DemandeState[] = new Array();
  ListStateDemandeCloturee: DemandeState[] = new Array();
  demandeState: DemandeState;

  formComment: FormGroup;
  formHistorique: FormGroup;

  constructor(private http: HttpClient, private fb:FormBuilder) { 
    this.formComment = this.fb.group({
      comment: ['']
    });

    this.formHistorique = this.fb.group({
      fkDemande: ['']
    });

  }

  addDemandeStateForm=this.fb.group({
    idDemandeState: [0],
    stateDemande: [''],
  //  date: [''],
    isActive: [true],
    comment: [''],
    fkDemande: [''],
    fkUser: [''],
    isAccepted: [false],
    isModified: [false]
    });


    
    GetListDemandeState() {

      return this.http.get('http://localhost:50599/api/DemandeState/GetListDemandeState');
  
    }

    GetDemandeStateByDemandeId(demandeId:any) {

      return this.http.get<any>('http://localhost:50599/api/DemandeState/GetDemandeStateByDemandeId'+'?+demandeId='+demandeId);
         
    }

    AddDemandeState(){
      return this.http.post('http://localhost:50599/api/DemandeState/AddDemandeState',this.addDemandeStateForm.value);
    }

    UpdateDemandeState(){
      return this.http.put('http://localhost:50599/api/DemandeState/EditDemandeState',this.addDemandeStateForm.value);
    }


    GetListStateDemandeByRole(state: string ,labelrole: string , condtition : string) {
      return this.http.get(environment.URLDemande + '/DemandeState/GetListStateDemandeByRole?state='+ state+'&labelrole='+ labelrole
       + '&condtition='+ condtition);
    }

    GetHistoriqueStateDemande(fkDemande : number) {
      return this.http.get(environment.URLDemande + '/DemandeState/GetHistoriqueStateDemande?fkDemande='+fkDemande);
    }

    GetListDemandeDistinct() {
      return this.http.get(environment.URLDemande + '/DemandeState/GetListDemandeDistinct');
    }


 


    ResetDemandeState(){
      this.addDemandeStateForm=this.fb.group({
        idDemandeState: 0,
        stateDemande: '',
  
        isActive: true,
        comment: '',
        fkDemande: '',
        fkUser: '',
        isAccepted: false,
        isModified: false
        });
    }
  

}
