import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrat-client',
  templateUrl: './contrat-client.component.html',
  styleUrls: ['./contrat-client.component.css']
})
export class ContratClientComponent implements OnInit {
  exform: FormGroup = new FormGroup({});
  imageClient: string ='';
  submitted = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.exform = fb.group({
      idContrat :  new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\-[0-9]{1,3}')
      ]),
      nomClient : new FormControl('', Validators.required),
      fileUpload: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  get exformFunction() { return this.exform.controls; }

  clicksub(){
    let key, val;
    var dataSend = this.exform.value;
    var imageClientSendIt = this.imageClient
    console.log(dataSend)
    const queryObj = {
      dataSend,
      imageClientSendIt
    }
    if (!this.exform.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vérifier tous les informations',
      })
    }
    this.http.post('http://127.0.0.1:5000/groupe/contratClient', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            console.log(val);
            if(key == "ajouteResult"){
              if(val==0){
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
      this.exform.reset();
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageClient = reader.result as string;

        /*this.form.patchValue({
          fileSource: reader.result
        });*/
        console.log(this.imageClient)

      };

    }
  }

}
