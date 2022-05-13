import { Component, Input, OnInit, Directive, ViewContainerRef, ComponentFactoryResolver, ViewChild, ElementRef, Inject } from '@angular/core';
import { RightChatComponent } from '../right-chat/right-chat.component';
import { LeftChatComponent } from '../left-chat/left-chat.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FriendComponent } from '../friend/friend.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  message!: string;


  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient, private shared: SharedService) { }



  @ViewChild("ref", { read: ViewContainerRef }) container!: ViewContainerRef;
  ngOnInit(): void {
    // this.shared.clickEvent.subscribe((data:string) => {console.log(data)})

    const right = this.componentFactoryResolver.resolveComponentFactory(LeftChatComponent);
    console.log(this.container)
    //  this.viewContainerRef.createComponent(right)

  }
  currentItem = "Test";

  ngAfterViewInit() {

    const left = this.componentFactoryResolver.resolveComponentFactory(LeftChatComponent);
    const right = this.componentFactoryResolver.resolveComponentFactory(RightChatComponent);

    this.shared.clickEvent.subscribe((data: string) => {
      console.log(data)
      this.shared.set(data)


      this.http.post<any>('http://localhost:3000/api/query', { action: 'getMessages', receiverID: data }).subscribe(msg => {
        console.log(msg.messages)
        for(var i = 0; i < msg.messages.length; i++){
          if(msg.messages[i].senderID == data){
            this.container.createComponent(left).instance.item = msg.messages[i].message
          }else{
            this.container.createComponent(right).instance.item = msg.messages[i].message
          }
        }
        
      })
    })



    // this.http.post<any>('http://localhost:3000/api/query', {action: 'getMessages'}).subscribe(data =>{

    // })

  }




}
