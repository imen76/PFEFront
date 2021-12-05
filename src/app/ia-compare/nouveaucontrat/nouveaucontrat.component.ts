import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveaucontrat',
  templateUrl: './nouveaucontrat.component.html',
  styleUrls: ['./nouveaucontrat.component.css']
})
export class NouveaucontratComponent implements OnInit {
  textBoxDisabled = true;
  submitted = false;
  formNewDemande: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.formNewDemande = fb.group({
      inputIdContrat: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\-[0-9]{1,3}')
      ]),
      
      nomClt: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      inputTypeContract: new FormControl('', Validators.required),
      nomAchet: new FormControl('', Validators.required),
      nomVende: new FormControl('', Validators.required),
      objetContrat: new FormControl('', Validators.required),
      prixAV: new FormControl('', Validators.required),
      conf: new FormControl('', Validators.required),
      inputPaiement: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  get exformFunction() { return this.formNewDemande.controls; }

  toggle() {
    this.textBoxDisabled = !this.textBoxDisabled;
  }
  clicksub() {
    let key, val;
    if (!this.formNewDemande.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vérifier tous les informations',
      })
    }
    else{
      var dataSend = this.formNewDemande.value;
      const queryObj = {
        dataSend
      }
      console.log(dataSend)
      this.http.post('http://127.0.0.1:5000/groupe/nouveauContrat', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            console.log(val);
            if(key == "ajouteResult"){
              if(val=="0"){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Ajout non effectuée !",
                })
              }
              else{
                console.log(val[2]);
                Swal.fire(
                  'Good job!',
                  'Ajout avec success!',
                  'success'
                )
                this.router.navigateByUrl('/listeContrats', {});
              }
            }
          }
        })
      this.submitted = true;
      this.formNewDemande.reset();
    }
    
  }
}
