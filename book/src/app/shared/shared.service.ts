import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message!: string;

  xx!: string;

  set(ab: string){
    this.xx = ab
  }
  get(){
    return this.xx
  }

  constructor() { }

  @Output() clickEvent = new EventEmitter<string>()
  @Output() newMessage = new EventEmitter<string>()

  ClickedId(msg: string){
    this.clickEvent.emit(msg)
  }

  
  


}
