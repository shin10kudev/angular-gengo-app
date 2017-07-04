import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: FirebaseListObservable<Post[]>;
  showSpinner: boolean = true;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    this.posts = this.postSvc.getPostsList({limitToLast: 5})
    this.posts.subscribe(() => this.showSpinner = false)
  }
}
