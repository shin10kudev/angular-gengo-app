import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Post } from './post';

@Injectable()
export class PostService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  private basePath:string = '/posts';
  posts: FirebaseListObservable<Post[]>;
  userId: string;

  getPosts(query={}) {
    if (!this.userId) return;
    this.posts = this.db.list(`${this.basePath}/${this.userId}`, {
      query: query
    });
    return this.posts
  }

  deletePost(post: Post) {
    this.deleteFileData(post.$key)
    .then( () => {
      this.deleteFileStorage(post.name)
    })
    .catch(error => console.log(error))
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(post: Post) {
    let date = Date.now()
    const uploadName = date + post.file.name
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${uploadName}`).put(post.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        post.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        post.url = uploadTask.snapshot.downloadURL
        post.name = uploadName
        this.saveFileData(post)
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(post: Post) {
    this.db.list(`${this.basePath}/${this.userId}`).push(post);
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/${this.userId}`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
