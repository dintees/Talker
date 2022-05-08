import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor(private shared: SharedService, private http: HttpClient) { }
  message = "data passing"
  ngOnInit(): void {
   
  }

  @Input() friend_img = '';
  @Input() friend_txt = '';

  frChat(){
    console.log(this.friend_txt)
    
    

    this.http.post<any>('http://localhost:3000/api/query', { action: 'getFriendsList'}).subscribe(list => {
      console.log(list.users)
      let id = list.users._id;
      
      for(var i =0; i< list.users.length; i++){
        if (this.friend_txt == list.users[i].login){
            console.log(list.users[i].login + "id:"+ list.users[i]._id)
            this.shared.ClickedId(list.users[i]._id)
        }

    
      }

    })

  }

}
