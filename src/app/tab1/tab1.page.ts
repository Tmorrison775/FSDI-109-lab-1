import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { DataService } from '../data.service';
import { firestore } from 'firebase';
import { SharedService } from '../serice/shared.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  postToShow: Post[] = [];

  constructor(private data: DataService, shared: SharedService) {

    //load data
    this.data.getAllPosts().subscribe(res => {
      this.postToShow = [];

      for (let i = 0; i < res.length; i++) {
        let post = res[i];
        let co: any = post.createdOn;
        post.createdOn = new firestore.Timestamp(co.seconds, co.nanoseconds).toDate();
        if (post.to == "Everyone" || post.to == shared.userName || post.from == shared.userName) {
          this.postToShow.push(post)
        }
      }

    });
  }

}
