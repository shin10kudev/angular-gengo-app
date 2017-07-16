import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})

export class PostDetailComponent implements OnInit {

  @Input() post: Post;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
  }

  deletePost(post) {
    this.postSvc.deletePost(this.post)
  }
}
