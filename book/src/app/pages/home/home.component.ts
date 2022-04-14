import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from "socket.io-client";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(private http: HttpClient, private router: Router) { }

  gotoLogin(){
    this.router.navigate(['/login'])
  }

  logout(){
    this.http.post<any>('http://localhost:3000/api/query', {action: 'logout'}).subscribe()
    console.log("logout")
    this.ngOnInit()
  }

  socket = io('http://localhost:3000/api/query');
  sendMessage(){
    this.socket.emit('socket test')
    console.log("socket log")
    
  }
  
  ngOnInit() {
             
      this.http.post<any>('http://localhost:3000/api/query', {action: 'check'}).subscribe(data => {
          console.log(data)
          if(data.loggedIn == false){
            this.gotoLogin()
            console.log("działa")
          }
          
      })
  this.sendMessage()
  }

  
  
 
  
}
