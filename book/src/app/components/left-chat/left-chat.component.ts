import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-chat',
  templateUrl: './left-chat.component.html',
  styleUrls: ['./left-chat.component.css'],
})
export class LeftChatComponent implements OnInit {

  @Input() leftText: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() item = '';
}
