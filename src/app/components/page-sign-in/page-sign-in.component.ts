import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment} from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.css']
})
export class PageSignInComponent implements OnInit {
  hide = true;
  exform: FormGroup = new FormGroup({});
  submitted = false;
  imageDataSend: any;

  user: User

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    //localStorage.setItem("token", "")
    this.exform = fb.group({
      matricule: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    })
  }

  // clicksub() {
  //   let key, val , id;
  //   if (!this.exform.valid) {
  //     alert('Vous devez saisir tous les champs !!.');
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Veuillez remplir tous les champs !',
  //     })
  //   }
  //   else {
  //     var dataSend = this.exform.value;
  //     console.log(dataSend)
  //     const queryObj = {
  //       dataSend
  //     }
  //     this.http.post('http://127.0.0.1:5000/groupe/LoginUser', queryObj)
  //       .subscribe(res => {
  //         debugger
  //         for ([key, val] of Object.entries(res)) {
  //           console.log("2222222222222222222");
  //           console.log(res);
  //           console.log(val[2]);
  //           if (key == "variableLogin") {
  //             if (val == 0) {
                
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Oops...',
  //                 text: "Veuillez vérifier l'adresse email ou le mot de passe !",
  //               })
  //             }
  //           }
  //           if (key == "resultFirstName") {
  //             var user = "";
  //             user = val;
  //             id= val[0]

  //             Swal.fire(
  //               'Bienvenue  ' + user  ,
  //               'Vous êtes bien connecté!',
  //               'success'
  //             )
  //           }
  //           if(key == "resultRole"){
  //             localStorage.setItem("token", val)
  //             this.router.navigateByUrl('/home', {});
  //             console.log("Login Admin with sucess");
  //           }
  //         }
  //       })
  //     this.submitted = true;
  //     this.exform.reset();
  //   }

  // }
  // get exformFunction() { return this.exform.controls; }


  ngOnInit(): void { }

  AuthenticateUser(mat : string , pass : string) {
    localStorage.clear();
    return this.http.get(environment.URLUser + '/Authentification/authenticate?Matricule='+ mat +'&Password='+ pass).subscribe(
      res => {
    
        localStorage.setItem('token', JSON.stringify(res));
        this.user = JSON.parse(localStorage.getItem('token') as string);
        
        if (this.user.userId != 0) {
      
            location.href = "/home";
              //             Swal.fire(
              //   'Bienvenue  ' + this.user.fullName  ,
              //   'Vous êtes bien connecté!',
              //   'success'
              // )

          }
            else {
              // Swal.fire({
              //   icon: 'error',
              //   title: 'Oops...',
              //   text: "Vous n'avez pas le droit d'accès !",
              // })

              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Vous n'avez pas le droit d'accès !",
                showConfirmButton: false,
                timer: 1500
              })

              
              this.exform.reset();
              console.log('Login ou Mot de passe incorrect');
            }
      //  }
      },
      err => {
        console.log('Incorrect password ');
        this.exform.reset();
      },

    );
  } 

}
