import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Demande } from '../models/demande';
import { DemandeService } from '../services/demande.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]

})
export class DashboardComponent implements OnInit {
  selected: Date | null;

  @Input()
  demandes!: Demande[];
  listContratClient: any
  maDate = new Date();
  cc:any
  constructor(private http: HttpClient, private demandeService: DemandeService,private datePipe: DatePipe) {
    
   }
  totalLength: any;
 sum : any;
 sump : number=0;
 sumc : number=0;
 sume :number=0
 listEmploye: any;
 

 listContratPGH: any;
  today = new Date();

  ngOnInit(): void {
    this.cc = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');


    this.demandeService.getAllDemandes().subscribe(data => {
      this.demandes = data;
      this.totalLength = data.length;
      // this.getCategories(); 
     this.sum =  this.totalLength = data.length; 

  
    })


    var dataSend = "Test1"
    let key, val;
    const queryObj = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/listContrats', queryObj)
    .subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        if (key == "resultClient") {
          //this.imageValue = val;
          console.log("Contrats affichés avec succès !")
          console.log(val)
          this.listContratClient = val
          this.sumc= val.length;
        }
        else if(key == "resultPGH"){
        //this.imageValue = val;
        console.log("Contrats ajoutés !")
        console.log(val)
        this.listContratPGH = val
        this.sump= val.length;
        }
      }
    })
  
    this.http.post('http://127.0.0.1:5000/groupe/listUser', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultListUser") {
            //this.imageValue = val;
            console.log("Recive the data with sucess !")
            this.listEmploye = val
            this.sume= val.length;


          }
        }
      })
     
      
  }

  
}
