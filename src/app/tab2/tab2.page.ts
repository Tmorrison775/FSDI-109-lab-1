import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { DataService } from '../data.service';
import { Friend } from '../models/friend';
import { SharedService } from '../serice/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  p: Post = new Post();
  friendsToDisplay : Friend[] = [];

  constructor(private data: DataService, private shared : SharedService) {
    data.getAllFriends().subscribe(list => {
      //filter
      for(let i=0; i < list.length; i++){
        let f = list[i];
        if(f.belongsTo == shared.userName){
          this.friendsToDisplay.push(f);
        }
      }

      //sort the array

      this.friendsToDisplay = this.friendsToDisplay.sort((left,right)=> {
        if(left.name.toLowerCase() < right.name.toLowerCase()) {
          return -1;
        }
        else {
          return 1;
        }
      })

    
    })
    
  }
  post() {
    console.log('save btn pressed');
    console.log(this.p);

    //assign default FROM

    this.p.from = this.shared.userName;

    //save the post
    this.data.savePost(this.p);

    //clear the form
    this.p = new Post();
  }

}
