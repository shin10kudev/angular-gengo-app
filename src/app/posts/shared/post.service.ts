import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from './post';

@Injectable()
export class PostService {

  posts: FirebaseListObservable<Post[]> = null // list of objects
  // post: FirebaseObjectObservable<Post> = null // single object
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getPostsList(query={}): FirebaseListObservable<Post[]> {
    if (!this.userId) return;
    this.posts = this.db.list(`posts/${this.userId}`, {
      query: query
    });
    return this.posts
  }

  // Create new post
  createPost(post: Post): void {
    this.posts.push(post)
      .catch(error => this.handleError(error))
  }

  // Update an exisiting item
  updatePost(key: string, value: any): void {
    this.posts.update(key, value)
      .catch(error => this.handleError(error))
  }

  deletePost(key: string): void {
    this.posts.remove(key)
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
