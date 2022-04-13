import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Musisz podać email';
    }

    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

  public registerForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      login: [''],
      email: [''],
      password: [''],
      password2: [''],
      'action': ['register']
    })
  }

  gotoHome(){
    this.router.navigate(['/home'])
  }
  
  register(){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(this.registerForm.value)
    this.http.post<any>('http://localhost:3000/api/query', JSON.stringify(this.registerForm.value),{headers: headers}).subscribe(data =>
    {
      console.log(data.success)
      if(data.success == true){
        this.gotoHome()
      }else{
        alert(data.message);
        // (document.getElementById("mat-input-0") as HTMLInputElement).value="";
        // (document.getElementById("mat-input-1") as HTMLInputElement).value="";
        // (document.getElementById("mat-input-2") as HTMLInputElement).value="";
        // (document.getElementById("mat-input-3") as HTMLInputElement).value="";    
      }
    }
    )
  }

}
