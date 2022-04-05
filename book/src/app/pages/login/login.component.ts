import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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



  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: [''],
      'action': ['login']
    })
  }

  gotoHome(){
    this.router.navigate(['/home'])
  }

  login(){

    const headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(this.loginForm.value)
    console.log("test")
    this.http.post<any>('http://localhost:3000/api/query', JSON.stringify(this.loginForm.value),{headers: headers}).subscribe(data => {
      console.log(data.success)
      if(data.success == true){
        this.gotoHome()
      }else{
        alert("Zły login lub hasło");
        (document.getElementById("mat-input-0") as HTMLInputElement).value="";
        (document.getElementById("mat-input-1") as HTMLInputElement).value="";  
      }
    }
    
    )
  }

}
