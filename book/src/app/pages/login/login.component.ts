import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Musisz podać email';
    }

    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

  public loginForm !: FormGroup

  constructor(private formBuilder : FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: [''],
      'action': ['login']
    })
  }

  login(){
    console.log(this.loginForm.value)
    this.http.post<any>('/query', JSON.stringify(this.loginForm.value)).subscribe()
  }

}
