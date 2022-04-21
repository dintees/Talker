import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-right-chat',
  templateUrl: './right-chat.component.html',
  styleUrls: ['./right-chat.component.css']
})
export class RightChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input() item = '';
}
