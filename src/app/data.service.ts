import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Post } from './models/Post';
import { Friend } from './models/friend';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPosts: Observable<Post[]>;
  postCollection: AngularFirestoreCollection<Post>;

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private fb: AngularFirestore) {
    this.postCollection = fb.collection<Post>('posts');
    this.friendCollection = fb.collection<Friend>('friends');

    //read all te messages from database and populate local array

    this.allPosts = this.postCollection.valueChanges();

    //read all friends

   }

   public savePost(post: Post){
     var item = Object.assign({}, post);
     this.postCollection.add(item);

   }
   public getAllPosts(){
     return this.allPosts;
   }
   public saveFriend(theNewFriendObject : Friend){
     var item = Object.assign({}, theNewFriendObject);
     console.log(item);
     console.log(theNewFriendObject);
     this.friendCollection.add(item);
   }

   public removeFriend(objId : string){
     this.fb.doc("friends/" + objId).delete();
   }

   public getAllFriends(){
     
    this.allFriends = this.friendCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map( m => {
          let id = m.payload.doc.id;
          let friend : Friend = m.payload.doc.data();
          friend.fbId = id;
          return friend;
        })
      })
    );
     return this.allFriends;
   }
}
