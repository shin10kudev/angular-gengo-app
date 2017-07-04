import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../shared/post';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {

  post: Post = new Post();

  constructor(private postSvc: PostService) { }

  ngOnInit() {
  }

  createPost() {
    this.postSvc.createPost(this.post)
    this.post = new Post() // reset post
  }
}
