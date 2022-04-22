import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() friend_img = '';
  @Input() friend_txt = '';

}
