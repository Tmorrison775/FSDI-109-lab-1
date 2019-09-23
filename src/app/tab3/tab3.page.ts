import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { DataService } from '../data.service';
import { SharedService } from '../serice/shared.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page { 

  model : Friend = new Friend();
  friendsToDisplay : Friend[] = [];

  constructor(private data : DataService, private shared : SharedService) {
    console.log(this.model);
    data.getAllFriends().subscribe(list => {

      //clear the array
      this.friendsToDisplay = [];

      //filter to see only my friends


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
    });
  }

  unfriend(friendToRemove : Friend){
    console.log('remove ', friendToRemove.name);
    this.data.removeFriend(friendToRemove.fbId);

  }

  register(){

    //set the belongTo to model
    this.model.belongsTo = this.shared.userName;


    //send the object to data service
    console.log(this.model);
    this.data.saveFriend(this.model);

    //clear the form
    this.model = new Friend();
  }

}
