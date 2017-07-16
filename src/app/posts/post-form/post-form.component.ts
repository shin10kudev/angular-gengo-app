import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';
import * as _ from "lodash";

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {

  selectedFiles: FileList;
  post: Post = new Post();
  isTranslate: boolean = false;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  createPost() {
    let file = this.selectedFiles.item(0)
    this.post.file = file
    this.postSvc.pushUpload(this.post)
    this.post = new Post();
  }
}
