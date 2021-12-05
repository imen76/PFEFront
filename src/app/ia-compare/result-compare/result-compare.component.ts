import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-compare',
  templateUrl: './result-compare.component.html',
  styleUrls: ['./result-compare.component.css']
})
export class ResultCompareComponent implements OnInit {
  listContratValider:any;
  contartValiderResult:any;
  constructor(private fb: FormBuilder, private http: HttpClient, private modalService: NgbModal) {
    let key, val;
    var dataSend = "";
    const queryObj = {
      dataSend
    }
    this.http.post('http://127.0.0.1:5000/groupe/getImageValiderFromDB', queryObj)
    .subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        if (key == "getImageValiderFromDB") {
          //this.imageValue = val;
          console.log("Contrats validéer sont là !")
          console.log(val)
          this.listContratValider = val
        }
        
      }
    });
    
  }

  ngOnInit(): void {
  }
  getImageValiderFromDB(idcontrat:any){
    let key,val;
    const queryObj={
      idcontrat
    }
    console.log(idcontrat)
    this.http.post('http://127.0.0.1:5000/groupe/getImageValiderToShow', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resultImage") {
            console.log(val)
            this.contartValiderResult = val
          }
        }
      })

  }

}
