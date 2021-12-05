import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


export class Employee {
  employeId: string;
  nom: string;
  prenom: string;
  matricule: string;
  DateNaissance: Date;
  email: string;
  poste: string;
  dateEmbauche: Date;
  roleEmploye: string;
  password: string;
  
}


@Component({
  selector: 'app-simpleadd',
  templateUrl: './simpleadd.component.html',
  styleUrls: ['./simpleadd.component.css']
})
export class SimpleaddComponent implements OnInit {


  public addmore: FormGroup;
  formArray:[]
  employees: Employee[]
  listEmploye: any;

  constructor(private _fb: FormBuilder, private http:HttpClient, private route: ActivatedRoute) {
    var dataSend = "Test1"
    let key, val;
    const queryObj = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/listUser', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultListUser") {
            //this.imageValue = val;
            console.log("Recive the data with sucess !")
            this.listEmploye = val
          }
        }
      })
   }
 

  ngOnInit(){
    this.addmore = this._fb.group({
      title: new FormControl(''),
      type:new FormControl(''),
      description:new FormControl(''),
      //itemRows: this._fb.array([this.initItemRows()])
      'itemRows': new FormArray([])
    });

    this.listEmploye().subscribe((response: any) => {
      this.listEmploye = response;
      //this.OnDelete = res;
      


    })

  }
  get formArr(){
    //return this.addmore.get('itemRows') as FormArray;
    return (<FormArray>this.addmore.get('itemRows')).controls;
  }

  initItemRows(){
    return this._fb.group({
      etape:new FormControl(''),
      email:new FormControl(''),
      description:new FormControl(''),
      // suggestion:new FormControl(''),
    });
  }

  addNewRow(){
    //this.formArr.push(this.initItemRows());
    const controls = new FormControl('');
    this.formArr.push(controls);
  }

  // deleteRow(index: number){
  //   this.formArr.removeAt(index);
  // }
  submit(){
    console.log(this.addmore.value);
  }

}
