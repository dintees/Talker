import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

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

  constructor(private formBuilder : FormBuilder) { }

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
    console.log(this.registerForm.value)
  }

}
