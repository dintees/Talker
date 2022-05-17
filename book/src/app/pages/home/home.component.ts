import { Component, OnInit, ViewContainerRef, ViewChild, HostListener, ElementRef, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { FriendComponent } from 'src/app/components/friend/friend.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"; 
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { SharedService } from 'src/app/shared/shared.service';
// import { emit } from 'process';
export let socket = io('http://localhost:3000');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  
  
  

  constructor(private http: HttpClient, private router: Router,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private shared: SharedService) {
      this.matIconRegistry.addSvgIcon('send', this.domSanitizer.bypassSecurityTrustResourceUrl('send.svg'))
     }

  messageSend(msg:string){
        this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {

      // socket.on('connect', () =>{
      //   console.log(socket.id+" "+userid.userID)
      //   socket.emit('handshake',{ socketID: socket.id, userID: userid.userID})
      // })
      console.log("test receiver:"+this.shared.get())

   
       socket.emit("chat",{senderID:userid.userID, message: msg, receiverID: this.shared.get()})
      
  })
   
  }   

  
  gotoLogin() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.http.post<any>('http://localhost:3000/api/query', { action: 'logout' }).subscribe()
    console.log("logout")
    this.ngOnInit()
  }

  // socket = io('http://localhost:3000');
  // sendMessage() {
  //   this.socket.emit('test')
  //   console.log("socket log")
  // }
  @ViewChild("container", {read: ViewContainerRef}) container!: ViewContainerRef;     


  

  ngOnInit() {

    this.http.post<any>('http://localhost:3000/api/query', { action: 'check' }).subscribe(data => {
      console.log(data)
      if (data.loggedIn == false) {
        this.gotoLogin()
        console.log("działa")
      }

    })
  //   this.sendMessage()
  //   let socket = io('http://localhost:3000');
  //   this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {

  //     socket.on('connect', () =>{
  //       console.log(socket.id+" "+userid.userID)
  //       socket.emit('handshake',{ socketID: socket.id, userID: userid.userID})
  //     })
      
  // })

    //only for angular server
   
    socket.on("messageSent", data =>{
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx")
      console.log("msg sent test: "+data)
    })
    
  }
  
  ngAfterViewInit() {
    
   
    console.log(this.container)

    this.http.post<any>('http://localhost:3000/api/query', { action: 'getFriendsList'}).subscribe(list => {
      console.log(list.users)
      let id = list.users._id;
      
      for(var i =0; i< list.users.length; i++){
        let a = this.container.createComponent(FriendComponent)
        a.instance.friend_txt=list.users[i].login
        a.instance.friend_img="https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"
  
      }

    })


    // this.sendMessage()
   
    this.http.post<any>('http://localhost:3000/api/query', { action: 'getUserID' }).subscribe(userid => {

      socket.on('connect', () =>{
        console.log(socket.id+" "+userid.userID)
        socket.emit('handshake',{ socketID: socket.id, userID: userid.userID})
      })
      
      socket.on("messageSent", data =>{
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx")
        console.log("msg sent test: "+data)
      })
  })

    //only for angular server
   
    // fr.instance.friend_txt="Jaś Fasola"
    // fr.instance.friend_img="https://stonebridgesmiles.com/wp-content/uploads/2019/12/GettyImages-1128826884-scaled.jpg"
    
  }





}
