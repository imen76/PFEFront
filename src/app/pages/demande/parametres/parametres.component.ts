import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class categorie {
  constructor(
    public categorieId: number,
    public typeCat: string,
    
  ) {
  }
}

export class mode {
  constructor(
    public modeId: number,
    public designation : string,
    
  ) {
  }
}



@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  
  s: number = 1;
  p: number = 1;
   categories: categorie[] ;
   modes: mode[];
   closeResult: string;
   deleteId: number;
   delId: number;
   results:any;
   

   constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getCategories(); 
    this.getModes();     
  }
  


  getCategories(){
    this.http.get<any>('http://localhost:50599/api/Categorie/GetListCategorie').subscribe(
      response => {
        console.log(response);
        this.categories = response;
        console.log(this.categories);

      }
    );
  }

  getModes(){
    this.http.get<any>('http://localhost:50599/api/Mode/GetListMode').subscribe(
      response => {
        console.log(response);
        this.modes = response;
        
      }
    );
  }

  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
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

  onSubmit(f: NgForm) {
    const url = 'http://localhost:50599/api/Categorie/PostCategorie';
    this.http.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onSave(f: NgForm) {
    const url = 'http://localhost:50599/api/Mode/PostMode';
    this.http.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
 
  openDelete(targetModal: any, mode: mode) {
    this.deleteId = mode.modeId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  openDel(targetModal: any, categorie:categorie) {
    this.delId = categorie.categorieId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  
  onDelete(){
    const deleteURL = 'http://localhost:50599/api/Mode/DeleteMode?id='+ this.deleteId;
    this.http.delete(deleteURL)
       .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
    
  }

  onDel(){
    const delURL = 'http://localhost:50599/api/Categorie/DeleteCategorie?id='+ this.delId;
    this.http.delete(delURL)
       .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
    
  }

   
  
}



