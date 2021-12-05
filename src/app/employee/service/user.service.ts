import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

user = JSON.parse(localStorage.getItem('token') as string);

ListAllUser: User[] = new Array();
  editForm: any;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  
  addOrEditUserForm = this.fb.group({
    userId: ['00000000-0000-0000-0000-000000000000'],
    nom: ['', [Validators.required]],
    prenom: ['' , [Validators.required]],
    matricule: ['' , [Validators.required]],
    dateEmbauche: ['', [Validators.required]],
    login: ['', [Validators.required]],
    password: ['' , [Validators.required]],
    //fkRole: ['' , [Validators.required]],
    fullName: ['' , [Validators.required]]
    //isActif: [true]
  });

  GetAllUsers() {
    return this.http.get(environment.URLUser + '/Users/GetListUser');
  }


  postProvider() {
    return this.http.post(environment.URLUser + '/Users/PostUser', this.addOrEditUserForm.value, { responseType: "text" });
  }

  updateProvider() {
    return this.http.put(environment.URLUser + '/Users/PutUser', this.addOrEditUserForm.value, { responseType: "text" });
  }

  DeleteProvider(user : User) {
    return this.http.put(environment.URLUser + '/Users/DeleteUser?userId='+ user.userId, { responseType: "text" });
  }

  resetaddOrEditUserForm() {
    this.addOrEditUserForm.reset({
      userId: '00000000-0000-0000-0000-000000000000',
      nom: '',
      prenom: '',
      matricule: '',
      dateEmbauche: '',
      Address: '',
      password: '',
      fkRole: '', 
      isActif: true

    });
  }


}