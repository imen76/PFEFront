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
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrls: ['./list-employer.component.css'],
  providers: [DatePipe]
})
export class ListEmployerComponent implements OnInit {

  closeResult: string;

  // listEmploye: any;
  p: number = 1;
  datePipeString: string;

  // departments = [
  //   { id: 3, value: 'Dep 1' },
  //   { id: 2, value: 'Dep 2' },
  //   { id: 3, value: 'Dep 3' }];

  // roles = [
  //   { value: 'Demandeur', text: 'Demandeur' },
  //   { value: 'Validateur 1', text: 'Validateur 1' },
  //   { value: 'Validateur 2', text: 'Validateur 2' },
  //   { value: 'Superviseur', text: 'Superviseur' }
  // ];

  form: FormGroup = new FormGroup({});

  submitted = false;
  editForm: FormGroup;
  nom: any;
  user: User[];
  

 
  //username: string = '';

  
  constructor(private http: HttpClient, private formbulider: FormBuilder, private modalService: NgbModal,
    private _snackBar: MatSnackBar, private router: Router, private datePipe: DatePipe, public serviceUser: UserService) {

    this.form = formbulider.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]*')

      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]*')

      ]),
      nom: new FormControl('', Validators.required),
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      //gender: new FormControl('1'),
      //department: new FormControl(0),
      dateEmbauche: new FormControl(''),
      //isPermanent: new FormControl(false),
   
    })

    // nomClt: new FormControl('', Validators.required),
  }
  
  // testFunction() {
  // }

  totalLength: any;


  ngOnInit(): void {
    this.serviceUser.GetAllUsers().subscribe(res => {
    this.serviceUser.ListAllUser = res as User[]
    })
    // this.listEmploye().subscribe((response: any) => {
    //   this.listEmploye = response;
    //   //this.OnDelete = res;
    //   this.totalLength = response.length;


    // })

    this.editForm = this.formbulider.group({
      userId: [''],
      fullName: [''],
      matricule: [''],
      prenom: [''],
      nom: [''],
      login: [''],
      password: [''],
      dateEmbauche: [''],


    }

    );


    //throw new Error('Method not implemented.');

  }

  onDeleteUser(emp: User) {

  }
  get exformFunction() { return this.form.controls; }



  //  this.submitted = true;
  //    this.form.reset();
  //   }
  // }


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

  openEdit(targetModal: any) {

    console.log(User)
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });


    
       this.editForm.patchValue({

            UserId: User.userId,
            FullName: User.fullName,
            Nom: User.nom,
            Prenom: User.prenom,
            Matricule: User.matricule,
            Login: User.login,
            Password: User.password,
            DateEmbauche: User.dateEmbauche

       });

      
   
  
      }

   onSave() {
      const editURL = 'https://localhost:55524/api/Users/PutUser?id '+ this.editForm.value.id;
      //console.log(this.editForm.value);
      this.http.put(editURL, this.editForm.value)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });

    } 



  //             //window.location.reload();

  //           }
  //         }
  //       }

  //     })
  // }

  // onEdituser() {

  // }



  // onDeleteUser(employeId: any) {
  //   var key, val;
  //   console.log(employeId)
  //   var dataSend = employeId;
  //   const queryObj = {
  //     dataSend
  //   }
  //   this.http.post('http://127.0.0.1:5000/groupe/deleteUser', queryObj)
  //     .subscribe(res => {
  //       for ([key, val] of Object.entries(res)) {
  //         if (key == "resultFunction") {
  //           if (val == 1) {
  //             Swal.fire(
  //               'deleted',
  //               'success'
  //             )
  //           }
  //           window.location.reload();
  //         }
  //       }

  //     })
  // }

  

  // 
}

// function InitFormForEdit(user: any, User: typeof User) {
//   throw new Error('Function not implemented.');
// }



