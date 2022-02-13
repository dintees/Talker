import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private formBuilder : FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      login: [''],
      email: [''],
      password: [''],
      password2: [''],
      'action': ['register']
    })
  }
  
  register(){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(this.registerForm.value)
    this.http.post<any>('/api/query', JSON.stringify(this.registerForm.value),{headers: headers}).subscribe()
  }

}
