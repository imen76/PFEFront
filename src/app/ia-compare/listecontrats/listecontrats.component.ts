import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratClientComponent } from '../contrat-client/contrat-client.component';
import { contrat } from 'src/app/models/contrat';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listecontrats',
  templateUrl: './listecontrats.component.html',
  styleUrls: ['./listecontrats.component.css']
})

export class ListecontratsComponent implements OnInit {
  formCheckDiffernce: FormGroup = new FormGroup({});
  imageSource: string = '';
  imageResult: string = '';
  listContratClient: any = new MatTableDataSource<any>([]);;
  listContratPGH: any;
  contrats: contrat[];
  search: any;
  project: any;
  datePipeString : string;

  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(private fb: FormBuilder, private http: HttpClient, private modalService: NgbModal) {
    this.formCheckDiffernce = fb.group({
      idContartPGH: new FormControl('', )
    })
    console.log("Test 1")
    var dataSend = "Test1"
    let key, val;
    const queryObj = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/listContrats', queryObj)
    .subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        if (key == "resultClient") {
           this.listContratClient = val
        }
        else if(key == "resultPGH"){ 
         this.listContratPGH = val
        this.sum= val.length;
        }
      }
    })

  }
  sum : any;
  index : any;

  totalLength: any;
  p=1;
 
  idContrat : any
  nomClient: any
  ngOnInit(): void {

    this.editForm = this.fb.group({ 
      idContrat:[''],   
      nomClient:[''],
      dateCreation:[''],
            }
    );

  }

  get exformFunction() { return this.formCheckDiffernce.controls; }

  clicksubMethode(){
    var dataSend = this.formCheckDiffernce.value;
    console.log(dataSend)
    let key,val;
    var contartPGH = this.imageSource;
    const queryObj = {
      contartPGH,
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/verfierConformite', queryObj)
      .subscribe(res => {
        /*for ([key, val] of Object.entries(res)) {
          if (key == "urlResultImage") {
            console.log(val)
            this.imageResult = val;
          }
        }*/
      })

  }

  onUploadContrat(){
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
          if (key == "urlgetImageDB") {
            console.log(val)
            this.imageSource = val;
          }
        }
      })
  }

  fireFilterEvent(event: Event) {
    let key, val;
    const input = (event.target as HTMLInputElement).value;
    var inputFinale = input;
    console.log(inputFinale)
    const queryObj = {
      inputFinale
    }
    
    this.http.post('http://127.0.0.1:5000/client/rechercherContratClient', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultID" || key=="resultName" || key=="resultDate") {
            console.log(val)
            //Vous allez mettre toutes les informations dans le message pop up
          }
          else{
            //message d'alerte si les champs ne sont pas valides
          }
        }
      })
  }

  closeResult: string;
  editForm:FormGroup;

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  openEdit(targetModal: any, contrat: contrat) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({
    
      idContrat : contrat.idContrat,
      nomClient: contrat.nomClient,
      dateCreation: contrat.dateCreation,
      
  
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
  Search() {
    if (this.search == "") {
      this.ngOnInit();
    } else {
      this.contrats = this.contrats.filter(res => {
        return res.nomClient.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      });
    }

  }

}



