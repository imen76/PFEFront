import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Demande } from '../models/demande';
import { NouvelleDemandeComponent } from '../pages/demande/nouvelle-demande/nouvelle-demande.component';
 import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { newArray } from '@angular/compiler/src/util';
import { UserService } from '../employee/service/user.service';



@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  demande : Demande;

 // addDemandeForm: FormGroup;
  
  // httpOptions = {
  //   Headers: new HttpHeaders({
  //     'Content-Type':'application/json'
  //   })
  // }
   
  //  demande = [];
  //  //addForm: Demande = new Demande();
  //  /*demandeState: string;
  //  listDocumentsByState: DocumentListDto[];*/

  //   addForm: FormGroup = this.formBuilder.group({
  //   TypeDemande: [''],
  //   DateDemande: [''], 
  //   Lieu : [''],
  //   Partie1 :[''],
  //   Partie2 :[''],
  //  })
   
   
  // editform = this.formBuilder.group({

  //   DemandeId : [""], 
  //   Lieu : ["",Validators.required],
  //   Partie1 : ["",Validators.required],
  //   Partie2 : ["",Validators.required] 


    
  // })


  demandeForm = this.formBuilder.group({
      DemandeId: [''],
      TypeDemande:[''],
      TypeContact : [''],
      ContactName :[''],
      Filiale :[''],
      CurrentState :[''],
  })

  //

  addDemandeForm = this.formBuilder.group({
    DateDemande: [''],
    labelDemande: [''],
    Lieu: [''],
    Partie1: [this.serviceUser.user.labelSubsidary],
    Partie2: [''],
    FKCategorie: [''],
    FKMode: [''],
    FKUser: [this.serviceUser.user.userId],
    Montant: [0],
    Comment: [''],
    IsActive: [true]
  })
  listDemandes: Demande[] =new Array();
   constructor(private formBuilder: FormBuilder, private http:HttpClient , public serviceUser: UserService) { 

   }
   
   
  InitFormForEdit( demande : Demande){

    this.demandeForm.setValue({
  
      DemandeId : demande.demandeId,
      TypeDemande: demande.typeDemande,
      Lieu: demande.lieu,
      Partie1: demande.partie1,
      Partie2: demande.partie2,
      // TypeContact: demande.typeContact,
      // Filiale : demande.filiale,
      // ContactName : demande.contactName, 
      // CurrentState : demande.currentState, 

  })
  }
   url="http://localhost:50599/api/Demande/GetListDemande"
   var="http://localhost:50599/api/Demande/PostDemande"
    
   getAllDemandes() {
    return this.http.get<any>(this.url);
   } 
  
   getDemande(id: number){
     return this.http.get("http://localhost:50599/api/Demande/GetDemande?"+id)
   }

   create(data: Data): Observable<any> {
    return this.http.post(this.var,data);
  }
   

   OnDelete(id : number){
    return this.http.delete("http://localhost:50599/api/Demande/DeleteDemande?id="+id);
    
   }
 
   OnModif(id: number, demande: Demande){
    return this.http.put("http://localhost:50599/api/Demande/put"+id,JSON.stringify(demande)) 
    

   }

   ResetDemande(){
    this.addDemandeForm.reset({
      idDemandeState :0,
    DateDemande:'',
    labelDemande:'',
    Lieu:'',
    Partie1:this.serviceUser.user.labelSubsidary,
    Partie2:'',
    FKCategorie :'',
    FKMode: '',
    FKUser: this.serviceUser.user.userId,
    Montant:0,
    Comment : ''
   });
   }


  //  PutDocument(){
  //   return this.http.put('https://localhost:5000/api/Document/'+  this.documentForm.controls.idDoc.value ,this.documentForm.value,{responseType : "text"}) ;
  // }
}
