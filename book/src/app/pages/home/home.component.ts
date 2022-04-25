import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { FriendComponent } from 'src/app/components/friend/friend.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"; 
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, 
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, ) {
      this.matIconRegistry.addSvgIcon('send', this.domSanitizer.bypassSecurityTrustResourceUrl('send.svg'))
     }

  gotoLogin() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.http.post<any>('http://localhost:3000/api/query', { action: 'logout' }).subscribe()
    console.log("logout")
    this.ngOnInit()
  }

  socket = io('http://localhost:3000');
  sendMessage() {
    this.socket.emit('test')
    console.log("socket log")
  }
  @ViewChild("container", {read: ViewContainerRef}) container!: ViewContainerRef;     

  ngOnInit() {

    this.http.post<any>('http://localhost:3000/api/query', { action: 'check' }).subscribe(data => {
      console.log(data)
      if (data.loggedIn == false) {
        this.gotoLogin()
        console.log("działa")
      }

    })
    this.sendMessage()
  }

  ngAfterViewInit() {
    const friend = this.componentFactoryResolver.resolveComponentFactory(FriendComponent);
    console.log(this.container)
    let fr = this.container.createComponent(friend)

    this.http.post<any>('http://localhost:3000/api/query', { action: 'getFriendsList'}).subscribe(list => {
      console.log(list.users)
      for(var i =0; i< list.users.length; i++){
        fr.instance.friend_txt=list.users[i].login
    fr.instance.friend_img="https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"
      }

    })

    // fr.instance.friend_txt="Jaś Fasola"
    // fr.instance.friend_img="https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"
    
  }





}
