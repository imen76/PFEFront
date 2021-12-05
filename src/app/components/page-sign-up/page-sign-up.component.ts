import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-page-sign-up',
  templateUrl: './page-sign-up.component.html',
  styleUrls: ['./page-sign-up.component.css']
})
export class PageSignUpComponent implements OnInit {
  hide = true;
  hideConf = true;
  form: FormGroup = new FormGroup({});
  submitted = false;
  imageValue: any;
  imageSrc: string = '';
  //selectedFile: File;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      cin: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8)
        ]),
      phone: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      date: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      fileSource: new FormControl('', [Validators.required]),
      checkbox: new FormControl('', [Validators.required])
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    })
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  clicksub() {
    let key,val;
    if (!this.form.valid) {
      alert('You must Complete all the filed.');
      console.log("We can't do anything");
    }
    else {
      var dataSend = this.form.value;
      const queryObj = {
        dataSend
      }
      this.http.post('http://127.0.0.1:5000/Company/AddWorker', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if(key == "test"){
              //this.imageValue = val;
              console.log(val);
              if(val==1){
                alert('There is an Account please add a New :p :p');
              }
              else{
                console.log("You are in our Company :) :)");
                alert("You are in our Company :) :)");
              }
            }
          }
        })
      this.submitted = true;
      this.form.reset();
    }

  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {
  }

}
