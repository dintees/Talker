import { Injectable, EventEmitter, Output } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message!: string;

  constructor() { }

  @Output() clickEvent = new EventEmitter<string>()
  @Output() idEvent = new EventEmitter<string>()
  ClickedId(msg: string){
    this.clickEvent.emit(msg)
  }

}
