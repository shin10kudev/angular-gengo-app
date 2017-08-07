import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';
import * as _ from 'lodash';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})

export class PostsListComponent implements OnInit {

  // Unwrapped arrays from firebase
  posts: any;
  filteredPosts: any;

  // Active filter rules
  filters = {};

  // Misc.
  showSpinner: boolean = true;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    this.postSvc.getPosts({ limitToLast: 20 })
      .subscribe(posts => {
        this.posts = posts;
        this.applyFilters();
        this.showSpinner = false;
      })
  }

  private applyFilters() {
    this.filteredPosts = _.filter(this.posts, _.conforms(this.filters));
  }
}
