import { Component, Input, OnInit, Directive, ViewContainerRef, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { RightChatComponent } from '../right-chat/right-chat.component';
import { LeftChatComponent } from '../left-chat/left-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {



  
  constructor( private componentFactoryResolver: ComponentFactoryResolver) { }

  
              
  @ViewChild("ref", {read: ViewContainerRef}) container!: ViewContainerRef;       
  ngOnInit(): void {
    
   const right = this.componentFactoryResolver.resolveComponentFactory(LeftChatComponent);
   console.log(this.container)
  //  this.viewContainerRef.createComponent(right)
   
  } 
  currentItem = "Test";
  
  ngAfterViewInit() {
    const left = this.componentFactoryResolver.resolveComponentFactory(LeftChatComponent);
    const right = this.componentFactoryResolver.resolveComponentFactory(RightChatComponent);
    console.log(this.container)
    this.container.createComponent(right).instance.item="Witam"
    this.container.createComponent(left).instance.item="Dzień dobry"
    this.container.createComponent(right).instance.item = "test12345"
  }

 

  
}
