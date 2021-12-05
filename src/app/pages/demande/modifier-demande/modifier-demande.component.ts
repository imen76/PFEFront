import { Component, Input, OnInit } from '@angular/core';
 import { Demande } from 'src/app/models/demande';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/services/demande.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifier-demande',
  templateUrl: './modifier-demande.component.html',
  styleUrls: ['./modifier-demande.component.css']
})
export class ModifierDemandeComponent implements OnInit {
  @Input()
   demande: Demande;
  constructor(private demandeService: DemandeService,private route : ActivatedRoute, private router : Router, private http: HttpClient,  private modalService: NgbModal) { }
  id:number;
  form: FormGroup;
    
  ngOnInit() {
    this.id=+this.route.snapshot.params['id'];
    this.demandeService.getDemande(this.id)
       
    this.form = new FormGroup({
      Typedemande: new FormControl('', [Validators.required]),
      Lieu: new FormControl('', Validators.required)
    });
       
  }
  
  // InitFormForEdit( demande : Demande){

  //   this.demandeService.demandeForm.patchValue({
  
  //     DemandeId : demande.demandeId, 
  //     Lieu: demande.lieu,
  //     Partie1 : demande.partie1,
  //     Partie2 : demande.partie2, 
  
  // })
  // }
  

  // onEdit(targetModal: any,demde:demande){

  //   this.modalService.open(targetModal, {
  //     backdrop: 'static',
  //   });
  //   this.InitFormForEdit(demde);
  // }

 

  submit(){
    console.log(this.form.value);
    this.demandeService.OnModif(this.id, this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         //this.router.navigateByUrl('post/index');
    })
  }

}
