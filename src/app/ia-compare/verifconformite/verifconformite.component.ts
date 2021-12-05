import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifconformite',
  templateUrl: './verifconformite.component.html',
  styleUrls: ['./verifconformite.component.css']
})



export class VerifconformiteComponent implements OnInit {
  imageSource: string = '';
  imageSourceClient: string = '';
  imageResult: any;
  imageDataSend: any;
  formCheckDiffernce: FormGroup = new FormGroup({});
  submitted = false;
  idContract: any;
  visible1:boolean = false;
  visible2:boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.formCheckDiffernce = fb.group({
      idContratPGH: new FormControl('',),
      nomClient: new FormControl('',),
      idContartDesktop: new FormControl('',),
      nomClientDesktop: new FormControl('',)
    })
  }
  ngOnInit(): void {
  }

  onUploadImageClient() {
    let key, val;
    var dataSend = this.formCheckDiffernce.value;
    const queryObjR1 = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/getImageContratClient', queryObjR1)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultQuerry") {
            console.log(val)
            this.imageSourceClient = "data:image/gif;base64," + val;
          }
        }
      })
  }

  onUploadContrat() {
    var dataSend = this.formCheckDiffernce.value;
    console.log(dataSend)
    let key, val;
    console.log("Test1")
    const queryObjR1 = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/getImageContrat', queryObjR1)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultQuerry") {
            console.log(val)
            this.imageSource = "data:image/gif;base64," + val;
            console.log(this.imageSource)
          }
        }
      })
  }

  get exformFunction() { return this.formCheckDiffernce.controls; }

  clicksubMethode() {
    var dataSend = this.formCheckDiffernce.value;
    console.log(dataSend)
    let key, val;
    var contartPGH = this.imageSource;
    var contractClient = this.imageSourceClient;
    const queryObj = {
      contartPGH,
      contractClient,
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/verfierConformite', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          var resultScore = "";
          if (key == "ImageDiffernce") {
            console.log(val)
            this.imageResult = "data:image/gif;base64," + val;
          }
          if (key == "scoreResults") {
            console.log(val);
            var resultScore = "";
            resultScore = val;
            Swal.fire({
              title: 'Le taux de similarité entre les deux documents en pourcentage',
              text: 'la Similarité est de =' + resultScore + '%',
              confirmButtonText: 'Ok'
            });
          }

        }


      })

  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.visible1 = !this.visible1

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSource = reader.result as string;

        /*this.form.patchValue({
          fileSource: reader.result
        });*/
        console.log(this.imageSource)

      };

    }
  }

  onFileChangeClient(event: any) {
    const reader = new FileReader();
    this.visible2 = !this.visible2

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSourceClient = reader.result as string;

        /*this.form.patchValue({
          fileSource: reader.result
        });*/
        console.log(this.imageSourceClient)

      };

    }
  }
  saveTheResultImage() {
    if (!this.formCheckDiffernce.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Saisie Id Contrat et Nom Client",
      })
    }
    let key, val;
    var dataSend = this.formCheckDiffernce.value;
    const queryObj = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/saveTheResultImage', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "reslutQuerry") {
            if (val == "1") {
              Swal.fire(
                'Good job!',
                'Ajout avec success!',
                'success'
              )
              this.router.navigateByUrl('/ResultCompare', {});
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Ajout non effectuée !',
                text: "Vous répetez le meme Id",
              })
            }

          }
        }
      })
  }
}
