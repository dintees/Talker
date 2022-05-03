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

    this.shared.clickEvent.subscribe((data: string) => {
      console.log(data)
      this.http.post<any>('http://localhost:3000/api/query', { action: 'getMessages', receiverID: data }).subscribe(data => {

      })
    })



    // this.http.post<any>('http://localhost:3000/api/query', {action: 'getMessages'}).subscribe(data =>{

    // })

    const left = this.componentFactoryResolver.resolveComponentFactory(LeftChatComponent);
    const right = this.componentFactoryResolver.resolveComponentFactory(RightChatComponent);
    console.log(this.container)
    this.container.createComponent(right).instance.item = "Witam"
    this.container.createComponent(left).instance.item = "Dzień dobry"
    this.container.createComponent(right).instance.item = "test12345"
  }




}
