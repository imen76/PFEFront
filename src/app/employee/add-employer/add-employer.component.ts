import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../employee/service/employee.service';
import { Employee } from '../../employee/service/employee';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Country {
  CountryId: string;
  CountryName: string;
}

interface State {
  StateId: string;
  StateName: string;
  CountryId: string;
}

interface City {
  Cityid: string;
  CityName: string;
  StateId: string;
  CountryId: string;
}


@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent implements OnInit {

  selected: string;

  roles = [
    { value: 'Admin', text: 'Admin' },
    { value: 'Demandeur', text: 'Demandeur' },
    { value: 'Validateur 1', text: 'Validateur 1'},
    { value: 'Validateur 2', text: 'Validateur 2'},
    { value: 'Superviseur', text: 'Superviseur'}
  ];

  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateNaissance: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password:  new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get exformFunction() { return this.form.controls; }

  clicksub() {
    let key,val;
    console.log(this.form.value)
    if (!this.form.valid) {
      console.log("We can't do anything");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez remplir tous les champs !',
      })
    }
    else {
      var dataSend = this.form.value;
      const queryObj = {
        dataSend
      }
      this.http.post('http://127.0.0.1:5000/groupe/ajoutUser', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if(key == "variableADD"){
              //this.imageValue = val;
              console.log(val);
              if(val==1){
                Swal.fire(
                  'Good job!',
                  'Ajout avec success!',
                  'success'
                )
                window.location.reload();
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Ajout non effectué !',
                  text: "Erreur même Id",
                })
              }
            }
          }
        })
      
      this.submitted = true;
      this.form.reset();
    }
  }
}

