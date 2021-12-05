import { Component, OnInit, ViewChild  } from '@angular/core';

import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  closeResult: string;

  users= [];
  p: number = 1;
  datePipeString : string;

  departments = [
    { id: 3, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

  roles = [
    { value: 'Demandeur', text: 'Demandeur' },
    { value: 'Validateur 1', text: 'Validateur 1' },
    { value: 'Validateur 2', text: 'Validateur 2' },
    { value: 'Superviseur', text: 'Superviseur' }
  ];
  form: FormGroup = new FormGroup({});
  submitted = false;
  editForm: FormGroup;
  fullName:any;
  nom: any;
  prenom: string = '';
  matricule: any;
  login: any;
  password: any;
  dateEmbauche: any;
  
  // libelleRole :any ;
  // fullName :any ;
  
  constructor(private http: HttpClient, private fb: FormBuilder,private route: ActivatedRoute,  private modalService: NgbModal, private _snackBar: MatSnackBar, private router: Router, private datePipe: DatePipe) { 
    this.form = fb.group({
      nom: new FormControl('', [ 
        Validators.required,
        Validators.pattern('[A-Za-z]*')
  
      ]),
      prenom: new FormControl('', [ 
        Validators.required,
        Validators.pattern('[A-Za-z]*')
  
      ]),
      matricule: new FormControl('', Validators.required),
      //email: new FormControl(null, [Validators.required, Validators.email]),
      login: new FormControl('', Validators.required),
      //gender: new FormControl('1'),
      //department: new FormControl(0),
      dateEmbauche: new FormControl('', Validators.required),
      //isPermanent: new FormControl(false),
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  
  }
     
  ngOnInit():void {
    this.getUsers();
    
   
   }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUsers(){
    this.http.get<any>('http://localhost:55524/api/Users/GetListUser').subscribe(
      response => {
        console.log(response);
        this.users = response;
        
      }
    );
  }

  openEdit(targetModal: any, User: User ) {

    console.log(User)
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });

  }


  Ontest(){

  } 
    
  onDeleteUser(){

  }

  clicksub(){}
  
  

}



