import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})

export class PostsListComponent implements OnInit {

  posts: FirebaseListObservable<Post[]>;

  // Misc.
  showSpinner: boolean = true;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    this.posts = this.postSvc.getPosts({
      limitToLast: 15
    })
    this.posts.subscribe(() => this.showSpinner = false)
  }
}
